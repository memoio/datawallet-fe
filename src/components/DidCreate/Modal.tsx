"use client";
import Image from "next/image";
import React, { useState } from "react";

interface GeneralModalProps {
    handleClose: () => void;

}

const GeneralModal: React.FC<GeneralModalProps> = ({ handleClose }) => {
    const [name, setName] = useState("")
    const [supply, setSupply] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = () => {
        // e.preventDefault();
        alert("hello world")
    }
    return (
        <div
            className={`fixed overflow-hidden inset-0 flex items-center justify-center z-[500] modal-overlay w-full overflow-y-scroll backdrop-blur`}
        >
            <div
                onClick={handleClose}
                className={`modal bg-black bg-opacity-40 fixed inset-0 flex items-center justify-center`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`modal-content bg-[var(--primary-color)] flex items-center justify-center lg:w-[40%] w-full rounded-3xl overflow-y-auto transform transition-transform duration-300 ease-in-out bounce`}
                >

                    <div className='bg-black border-x-[3px] rounded-[18px] lg:h-[75vh] h-[80vh] flex flex-col gap-2 border-[#05F292] lg:w-[476px] w-[80%] items-center justify-center'>
                        <div>
                            <p className="text-[24px] font-bold text-white">Create NFT</p>
                        </div>
                        <div className="w-[68px] h-[68px] rounded-full bg-[#05F191] flex items-center justify-center">
                            <Image src={"/Images/download.svg"} width={24} height={16.29} alt="" />
                        </div>
                        <p className="w-[60%] text-center text-white">Drag and drop files to this area,  or browse local files</p>
                        <form className="flex flex-col gap-3 w-[70%]" action="">
                            <div className="flex flex-col gap-1">
                                <p className="text-white text-[16px]">Name</p>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name your NFT" className="border-[1px] border-[#05F292] rounded-[12px] p-2 w-full text-white bg-transparent" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-white text-[16px]">Supply</p>
                                <input value={supply} onChange={(e) => setSupply(e.target.value)} type="text" placeholder="1" className="border-[1px] border-[#05F292] rounded-[12px] p-2 w-full text-white bg-transparent" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-white text-[16px]">Description</p>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter a description" className="border-[1px] border-[#05F292] rounded-[12px] p-2 w-full text-white bg-transparent" name="" id=""></textarea>
                                {/* <input type="text" placeholder="Name your NFT" className="border-[1px] border-[#05F292] rounded-[12px] p-2 w-full text-white bg-transparent" /> */}
                            </div>
                            <button onClick={handleSubmit} className="bg-[#05F292] rounded-[33px] p-2 w-full text-black">Mint Now</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GeneralModal;
