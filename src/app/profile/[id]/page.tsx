export default function UserProfile({params}:any){
    return (
        <>
            <div className="flex items-center justify-center py-2 min-h-screen">
                <h1>Profile Page <span className="bg-orange-300 text-black rounded p-2">{params.id}</span></h1>
            </div>
        </>
    )
}