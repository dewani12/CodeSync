function Card({title, language, privacy}) {
  return (
    <div className="bg-[#313a4e] p-2 rounded-sm text-sm text-gray-300 w-46 hover:bg-[#3D485F] cursor-pointer">
      <div>
        <div>{title}</div>
        <div className="text-[10px] text-gray-400">{language}</div>
      </div>
      <div className="text-[12px] flex justify-end">{privacy}</div>
    </div>
  )
}

export default Card
