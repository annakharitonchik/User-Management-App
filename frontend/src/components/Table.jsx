const Table = () => {
  const personList = [
    {
      name: "fgh",
      role: "dfghj",
    },
  ];
  return (
    <div
      className="w-full h-screen caret-transparent bg-zinc-800 flex flex-col
    justify-center items-center gap-y-2"
    >
      <div className="w-5/6 h-5/6 bg-white rounded-xl">
        <div
          className="h-1/4 p-5 flex flex-col lg:flex-row gap-2 items-center
        text-xs lg:text-base"
        >
          <div className="w-full">
            <div className="font-semibold">user</div>
            <div>list</div>
          </div>
          <div className="w-full lg:text-end">
            <button className="bg-red-500 text-white p-2 rounded-lg">
              Add user
            </button>
          </div>
        </div>
        <div className="hidden lg:block p-5 w-full text-sm">
          <table className="p-5 w-full">
            <thead className="border-b">
              <tr className="">
                <th className="text-start py-2 pr-2 w-4/12">name</th>
                <th className="text-start py-2 pr-2 w-3/12">name</th>
                <th className="text-start py-2 pr-2 w-2/12">name</th>
                <th className="text-start py-2 pr-2 w-2/12">name</th>
                <th className="text-start py-2 pr-2 w-1/12">name</th>
              </tr>
            </thead>
            <tbody>
              {personList.map((person, index) => (
                <tr className="border-b" key={index}>
                  <td className="py-5">
                    <div className="flex gap-2">
                      <div className="font-medium"> {person.name}</div>
                      <div className="text-gray-400"> {person.name}</div>
                    </div>
                  </td>
                  <td>
                    <div className="font-medium"> {person.name}</div>
                    <div className="text-gray-400"> {person.name}</div>
                  </td>
                  <td>
                    <div
                      className="w-fit bg-green-100 px-2 py-1 text-green-600
                    font-semibold border border-green-600 rounded-lg"
                    >
                      active
                    </div>
                  </td>
                  <td>{person.role}</td>
                  <td>
                    <div className="text-black p-2 text-end">edit</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="h-3/4 grid lg:hidden grid-cols-1 md:grid-cols-2 p-5
        gap-2 overflow-y-scroll text-xs lg:text-base"
        >
          {personList.map((person, index) => (
            <div
              className="border rounded-lg flex items-center p-2 gap-2"
              key={index}
            >
              <div className="w-1/4 ">//img</div>
              <div className="w-3/4 ">
                <div className="font-medium ">{person.name}</div>
                <div className="text-gray-400">{person.name}</div>
                <div className="grid grid-cols-2 gap-2">{person.name}</div>
                <div className="text-gray-300">{person.name}</div>
                <div
                  className="w-fit bg-green-100 px-2 py-1 text-green-600
                text-xs font-semibold border border-green-600 rounded-lg"
                >
                  active
                </div>
                <div className="text-gray-300">edit</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
