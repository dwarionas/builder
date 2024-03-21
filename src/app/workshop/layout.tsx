

export default function WSLayout({ children }: { children: React.ReactNode }) {

    return (
        <div 
            className="
                bg-white 
                text-black 
                h-48
            "
        >
            {/* <div className="bg-gray-400"> */}
                {children}
            {/* </div> */}
        </div>
    )
}