import React from "react";
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
  const onSelectFile = async (event) => {
    let imagem2 = event.target.files[0];
    let base64 = await convertBase64(imagem2);
    setSelectedImages(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // useEffect(() => {
  //   console.log("selectedImage", selectedImage);
  // }, []);

  const handleClearImg = async (e) => {
    e.preventDefault();
    setSelectedImages("");
  };

  const body = (selectedImg) => {
    // console.log("selectedImage", selectedImage);
    if (selectedImg) {
      const chave = Math.random();
      return (
        <div className="images">
          <div key={chave} className="image">
            <img
              src={selectedImages}
              alt="upload"
              id="imageid"
              style={{
                width: tamanho ? "17rem" : false,
                height: tamanho ? "9rem" : false,
              }}
              // width={tamanho ? "25rem" : false}
              // height={tamanho ? 130 : false}
            />
            <button
              //   type="button"
              onClick={(e) => {
                handleClearImg(e);
              }}
            >
              Remover
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <label className="foto_user">
          {rotulo ? rotulo : `Foto`}
          <br />
          {capa && `Capa`}
          <input
            type="file"
            name="images"
            id="imageid"
            onChange={onSelectFile}
            // multiple
            accept="image/png, image/jpeg, image/webp"
          />
        </label>
      );
    }
  };
  return <section>{body(selectedImages)}</section>;
};

export default FileInput;
