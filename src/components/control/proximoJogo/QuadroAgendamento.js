import React, { useEffect, useState } from 'react'
import Timeline, {
    TimelineMarkers,
    CustomMarker,
    TodayMarker,
    CursorMarker,
    TimelineHeaders,
    SidebarHeader,
    DateHeader
} from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import './../../../styles/control/quadroProximosJogos.scss'
// import { items, groups } from './Marcacoes'
import moment from 'moment'
import useMarcacoes from './useMarcacoes'

const QuadroAgendamento = ({ items, groups }) => {
    console.log(items, groups)
    const [visibleTime, setVisibleTime] = useState({ start: moment().add(-1, 'hour'), end: moment().add(5, 'hour') })
    // const { loading, groups, items } = useMarcacoes()

    // console.log(loading, groups, items)

    useEffect(() => {
        setTimeout(() => {
            console.log(moment().format('HH:mm:ss'))
            const prev = { ...visibleTime }
            prev.start = moment().add(-1, 'hour')
            prev.end = moment().add(5, 'hour')
            setVisibleTime(prev)
        }, (60 * 1000));

        return () => { }
    }, [visibleTime])

    let keys = {
        groupIdKey: "id",
        groupTitleKey: "title",
        groupRightTitleKey: "title",
        itemIdKey: "id",
        itemTitleKey: "title",
        itemDivTitleKey: "title",
        itemGroupKey: "quadra",
        itemTimeStartKey: "start",
        itemTimeEndKey: "end",
        itemHeightRatio: 1
    };

    const getClassName = (grupo) => {
        let classFinal = ''
        if (grupo.type === "OoAxvibwL5Q38cpDSaYh") {
            classFinal = 'painel_padel'
        } else if (grupo.type === "8m6tNatSE2W0gLwtNDmr") {
            classFinal = 'painel_areia'
        } else {
            classFinal = 'painel_pickleball'
        }
        return classFinal
    }

    const itemRenderer = ({ itemContext, getItemProps, item }) => {
        console.log('item', item)
        console.log('itemContext', itemContext)
        console.log('getItemProps', getItemProps)
        return (
            <div {...getItemProps({
                className: 'item-menu-calendar',

            })}
            >
                <div className={`item-menu-calendar-final ${item?.permanente ? "item-permanente-calendar" : ""} ${item?.bloqueio ? "item-bloqueio-calendar" : ""}`}>
                    {itemContext.title}
                </div>
            </div>
        );
    };

    const toggleFullScreen = () => {
        var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
            (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
            (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
            (document.msFullscreenElement && document.msFullscreenElement !== null);

        var docElm = document.getElementById("timeline-calendar")
        if (!isInFullScreen) {
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }


    return (
        <div id='timeline-calendar'>
            <Timeline
                groups={groups}
                items={items}
                keys={keys}
                sidebarWidth={250}
                sidebarContent={<div>Above The Left</div>}
                canMove
                canResize="right"
                canSelect={false}
                itemsSorted
                itemTouchSendsClick={false}
                stackItems
                lineHeight={40}
                itemHeightRatio={1}
                visibleTimeStart={visibleTime.start}
                visibleTimeEnd={visibleTime.end}
                buffer={1}
                itemRenderer={itemRenderer}
                // itemRenderer={({ item }) => {
                //     console.log(item)
                //     return (
                //         itemRenderer(itemContext, getItemProps, item)
                //     )
                // }}
                groupRenderer={({ group }) => {
                    return (
                        <div className={`${getClassName(group)}`}>
                            <span className="title">{group.title}</span>
                        </div>
                    )
                }}
            >
                <TimelineHeaders className="sticky-header">
                    <SidebarHeader>
                        {({ getRootProps }) => {
                            return <div {...getRootProps()} onClick={() => toggleFullScreen()} className='calendar-date'>{moment().format('DD/MM/YYYY')}</div>;
                        }}
                    </SidebarHeader>
                    <DateHeader unit="hour" labelFormat="HH:mm" />


                </TimelineHeaders>
                <TimelineMarkers>
                    <TodayMarker />
                    <CustomMarker
                        date={moment().startOf("day").valueOf() + 1000 * 60 * 60 * 2}
                    />
                    <CustomMarker date={moment().add(3, "day").valueOf()}>
                        {({ styles }) => {
                            const newStyles = { ...styles, backgroundColor: "orange" };
                            return <div style={newStyles} />;
                        }}
                    </CustomMarker>
                    <CursorMarker />
                </TimelineMarkers>
            </Timeline>

            <div className='legenda'>
                <div className='legenda_item'>
                    <div className='painel_padel'></div>
                    Padel
                </div>
                <div className='legenda_item'>
                    <div className='painel_areia'></div>
                    Areia
                </div>
                <div className='legenda_item'>
                    <div className='painel_pickleball'></div>
                    Pickleball
                </div>
            </div>

        </div>
    )
}

export default QuadroAgendamento