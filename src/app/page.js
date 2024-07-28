import Link from "next/link";

export default function Landing() {
    return (
        <>
            <div>Landing Page</div>
            <div className="flex flex-col justify-center items-center p-8">
                <Link className="text-3xl underline" href="/products">
                    All Products
                </Link>

                <Link className="text-3xl underline" href="/users">
                    All Users
                </Link>
            </div>
        </>
    );
}
