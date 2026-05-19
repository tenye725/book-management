import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl p-8 max-w-sm mx-auto my-16 space-y-8 bg-white text-center shadow-sm">

            <div className="flex justify-center w-full">
                <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster scale-75 sm:scale-100">
                    <div className="wheel"></div>
                    <div className="hamster">
                        <div className="hamster__body">
                            <div className="hamster__head">
                                <div className="hamster__ear"></div>
                                <div className="hamster__eye"></div>
                                <div className="hamster__nose"></div>
                            </div>
                            <div className="hamster__limb hamster__limb--fr"></div>
                            <div className="hamster__limb hamster__limb--fl"></div>
                            <div className="hamster__limb hamster__limb--br"></div>
                            <div className="hamster__limb hamster__limb--bl"></div>
                            <div className="hamster__tail"></div>
                        </div>
                    </div>
                    <div className="spoke"></div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-black text-gray-900">길을 잃으셨나요?</h2>
                <p className="text-sm text-gray-500 mt-2 font-medium">
                    햄찍이가 열심히 서버를 돌리고 있지만,<br/>
                    요청하신 페이지는 찾을 수 없습니다. (404)
                </p>
            </div>

            {/*돌아가기*/}
            <div className="pt-2 w-full">
                <Link href="/" className="block w-full bg-red-800 hover:bg-red-950 text-white py-3 rounded-xl text-sm font-bold transition-colors shadow-sm">
                    메인 화면으로 돌아가기
                </Link>
            </div>
        </div>
    );
}