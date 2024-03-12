import React from "react";

const FileInputQuadra = ({
  selectedImage,
  setSelectedImage,
  capa,
  numImage,
  rotulo,
  tamanho,
  ...props
}) => {
  const onSelectFile = async (event) => {
    let imagem2 = event.target.files[0];
    let base64 = await convertBase64(imagem2);
    setSelectedImage(base64);
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
    setSelectedImage("");
  };

  const body = (selectedImg) => {
    // console.log("selectedImage", selectedImage);
    if (selectedImg) {
      const chave = Math.random();
      return (
        <div className="images">
          <div key={chave} className="image">
            <img
              src={selectedImage}
              alt="upload"
              id="imageid"
              style={{
                width: tamanho ? "10rem" : false,
                height: tamanho ? "10rem" : false,
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
  return <section>{body(selectedImage)}</section>;
};

export default FileInputQuadra;
