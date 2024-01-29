type ButtonType = "submit" | "reset" | "button";

interface Props {
    type: ButtonType;
    value: string;
    url?: string;
}

export default function Button({ type, value, url }: Props): JSX.Element {
    return (
        <>
            {
                url ? (
                    <a href={url} >
                        <button
                            className="block w-full transform rounded-md bg-primary px-4 py-2 text-center font-medium
    capitalize tracking-wide text-white transition-colors duration-300 hover:bg-hover
    focus:outline-none focus:ring focus:ring-hover focus:ring-opacity-80"
                            type={type}
                        >
                            {value}
                        </button>
                    </a>
                ) : (
                    <button
                        className="block w-full transform rounded-md bg-primary px-4 py-2 text-center font-medium
  capitalize tracking-wide text-white transition-colors duration-300 hover:bg-hover
  focus:outline-none focus:ring focus:ring-hover focus:ring-opacity-80"
                        type={type}
                    >
                        {value}
                    </button>
                )
            }
        </>
    );
}
