import Image from "next/image"

const UserCard = ({ type }: { type: string }) => {
    return (
        <div className='rounded-2xl odd:bg-red even:bg-green p-4 flex-1 min-w-[130px]'>
            <div className="flex justify-between item-center">
                <span className="text-[10px] bg-white px-2 py-1 rounded-full text-black-600">2025/26</span>
                <Image src="/more.png" alt="" width={20} height={20} />
            </div>
            <h1 className="text-2xl font-semibold my-4 text-white">5253</h1>
            <h2 className="capitalize text-white text-sm font-medium">{type}s</h2>
        </div>
    )
}

export default UserCard