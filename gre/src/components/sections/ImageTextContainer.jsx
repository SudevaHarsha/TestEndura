import Image from 'next/image';

const ImageTextContainer = ({ imageUrl, heading, description }) => {
  return (
    <div className="container px-0 sm:px-8 mx-auto sm:py-12 flex items-center justify-center flex-col-reverse sm:flex-row">
      <div className="w-[90%] md:w-1/2">
        <Image src={imageUrl} alt="Image" layout="responsive" width={800} height={600} />
      </div>
      <div className="w-full md:w-1/2 p-8">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ImageTextContainer;
