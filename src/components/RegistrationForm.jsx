import SocialLogins from "./SocialLogins";

const RegistrationForm = () => {
    return (
        <>
            <form className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md">
                <div className="my-2">
                    <label htmlFor="email">Full Name</label>
                    <input
                        className="border mx-2 border-gray-500 rounded"
                        type="fullName"
                        name="fullName"
                        id="fullName"
                    />
                </div>
                <div className="my-2">
                    <label htmlFor="email">Email Address</label>
                    <input
                        className="border mx-2 border-gray-500 rounded"
                        type="email"
                        name="email"
                        id="email"
                    />
                </div>

                <div className="my-2">
                    <label htmlFor="password">Password</label>
                    <input
                        className="border mx-2 border-gray-500 rounded"
                        type="password"
                        name="password"
                        id="password"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
                >
                    Register
                </button>
            </form>
            <SocialLogins />
        </>
    );
};

export default RegistrationForm;
