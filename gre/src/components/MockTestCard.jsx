import React from 'react';

const MockTestCard = () => {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
                <div className="relative overflow-hidden bg-white">
                    <img
                        src="/i1.gif" // Replace with your image source
                        alt="GRE Test"
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-25"></div>
                    <div className="absolute inset-0 flex justify-center items-center">
                        <button className="bg-yellow-500 text-white py-2 px-4 rounded-full text-lg font-bold tracking-wide">
                            Take Mock Test
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">GRE Practice Test</h2>
                    <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra lacus quis massa tristique, eget mattis odio ultrices.</p>
                    <div className="mt-4 flex items-center">
                        <svg className="w-4 h-4 fill-current text-gray-600 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-6h2v5h-2zm0-6h2v2h-2z"/>
                        </svg>
                        <span className="text-gray-600">30 questions</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MockTestCard;
