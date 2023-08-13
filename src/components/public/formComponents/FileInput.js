import React, { useEffect, useState } from "react";
import "./fileinput.scss";

const FileInput = ({
  selectedImages,
  setSelectedImages,
  capa,
  numImage,
  rotulo,
  tamanho,
  ...props
}) => {
  // const [img64, setImg64] = useState();
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    // const data = new FileReader();
    // data.addEventListener("load", () => {
    //   setImg64(data.result);
    // });
    // data.readAsDataURL(event.target.files[0]);
    const imagesArray = selectedFilesArray.map((file) => {
      numImage ? (file.numImage = numImage) : (file.numImage = 0);
      capa ? (file.capa = capa) : (file.capa = null);
      file.localUrl = URL.createObjectURL(file);
      console.log("file", file);
      return file;
    });
    setSelectedImages(imagesArray);
  };
  return (
    <section>
      {(!selectedImages || selectedImages?.length === 0) && (
        <label className="foto_user">
          {rotulo ? rotulo : `Foto`}
          <br />
          {capa && `Capa`}
          <input
            type="file"
            name="images"
            onChange={onSelectFile}
            // multiple
            accept="image/png, image/jpeg, image/webp"
          />
        </label>
      )}
      <div className="images">
        {selectedImages?.length > 0 &&
          selectedImages.map((image, index) => {
            return (
              <div key={index} className="image">
                <img 
                src={image.localUrl} 
                alt="upload" 
                height={tamanho ? 180 : false}
                />
                <button
                  onClick={() =>
                    setSelectedImages(selectedImages.filter((e) => e !== image))
                  }
                >
                  Remover
                </button>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default FileInput;
