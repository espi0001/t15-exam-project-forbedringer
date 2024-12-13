import Image from "next/image";

const HeaderBillede = ({ billede }) => {
  return (
    <div className="relative h-[300px] w-full">
      <Image src={billede} alt="Vibrant music festival crowd with colorful lights and energy" layout="fill" objectFit="cover" priority={true} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 z-10 bg-black/50"></div>
    </div>
  );
};

export default HeaderBillede;
