const Cert1 = () => {
    return(
    <>
        <div className="items-center p-1 border-2 rounded-md border-muted hover:border-accent hover:bg-accent hover:text-accent-foreground">
            <div className="space-y-2 rounded-sm bg-[#D2B48C] p-2">
                <div className="flex flex-col items-center p-2 space-y-2 bg-white rounded-md shadow-sm">
                    <div className="mt-2 w-6 h-6 rounded-full bg-[#D2B48C]" />
                    <div className="mt-4 h-2 w-[50px] rounded-lg bg-[#D2B48C]" />
                    <div className="h-2 w-[100px] rounded-lg bg-gray-400" />
                    <div className="h-2 w-[70px] rounded-lg bg-gray-600" />
                    <div className="h-2 w-[130px] rounded-lg bg-gray-400" />
                    <span className="flex flex-row items-center gap-8 py-2">
                        <div className="h-2 w-[30px] rounded-lg bg-gray-400" />
                        <div className="h-[30px] w-[30px] rounded-sm bg-gray-300" />
                        <div className="h-2 w-[30px] rounded-lg bg-gray-400" />
                    </span>
                </div>
            </div>
        </div>
        <span className="block w-full p-2 font-normal text-center">
            Tipo 1
        </span>
    </>
    )
}

export default Cert1;