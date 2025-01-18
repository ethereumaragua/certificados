const Cert2 = () => {
  return (
    <>
      <div className="items-center p-1 border-2 rounded-md border-muted bg-popover hover:bg-accent hover:text-accent-foreground">
        <div className="p-2 space-y-2 rounded-sm bg-slate-950">
          <div className="p-2 space-y-2 rounded-md shadow-sm bg-slate-800">
            <div className="h-2 w-[110px] rounded-lg bg-slate-400" />
            <div className="h-2 w-[150px] rounded-lg bg-slate-400" />
          </div>
          <div className="flex items-center p-2 space-x-2 rounded-md shadow-sm bg-slate-800">
            <div className="w-4 h-4 rounded-full bg-slate-400" />
            <div className="h-2 w-[150px] rounded-lg bg-slate-400" />
          </div>
          <div className="flex items-center p-2 space-x-2 rounded-md shadow-sm bg-slate-800">
            <div className="w-4 h-4 rounded-full bg-slate-400" />
            <div className="h-2 w-[150px] rounded-lg bg-slate-400" />
          </div>
        </div>
      </div>
      <span className="block w-full p-2 font-normal text-center">Tipo 2</span>
    </>
  );
};

export default Cert2;
