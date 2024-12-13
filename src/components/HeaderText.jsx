const HeaderText = ({ h1, text }) => {
  return (
    <div className="flex flex-col mb-10 items-center text-center text-black_color ">
      <h1>{h1}</h1>
      <p className="max-w-[65ch]">{text}</p>
    </div>
  );
};

export default HeaderText;
