const ClearButton = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="text-step_text_tiny text-less_black_color underline hover:text-red_color transition-colors">
      {label}
    </button>
  );
};

export default ClearButton;
