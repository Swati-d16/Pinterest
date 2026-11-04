// import { IKImage } from "imagekitio-react";

// const Image = ({ path, src, alt, className, w, h }) => {
//   const isAbsoluteUrl = (value) =>
//     typeof value === "string" && /^(https?:)?\/\//i.test(value);

//   const imageProps = isAbsoluteUrl(src)
//     ? { src }
//     : isAbsoluteUrl(path)
//     ? { src: path }
//     : { path };

//   return (
//     <IKImage
//       urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
//       {...imageProps}
//       transformation={[
//         {
//           height: h,
//           width: w,
//         },
//       ]}
//       alt={alt}
//       loading="lazy"
//       className={className}
//       lqip={{ active: true, quality: 20 }}
//     />
//   );
// };

// export default Image;


import { IKImage } from "imagekitio-react";

const Image = ({ path, src, alt, className, w, h }) => {
  const isAbsoluteUrl = (value) =>
    typeof value === "string" && /^https?:\/\//i.test(value);

  // Use whichever image property was provided
  const imagePath = src || path;

  // Absolute URLs use src; relative paths use path
  const imageProps = isAbsoluteUrl(imagePath)
    ? { src: imagePath }
    : { path: imagePath };

  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
      {...imageProps}
      transformation={[
        {
          ...(h ? { height: h } : {}),
          ...(w ? { width: w } : {}),
        },
      ]}
      alt={alt}
      loading="lazy"
      className={className}
      lqip={{ active: true, quality: 20 }}
    />
  );
};

export default Image;
