type ButtonType = 'submit' | 'reset' | 'button'

interface Props {
  type: ButtonType
  value: string
  url?: string
  onClick?: () => void
}

export default function Button ({ type, value, url, onClick }: Props): JSX.Element {
  const button = (
        <button
            className="block w-full transform rounded-md bg-primary px-4 py-2 text-center font-medium
            capitalize tracking-wide text-white transition-colors duration-300 hover:bg-hover
            focus:outline-none focus:ring focus:ring-hover focus:ring-opacity-80"
            type={type}
            onClick={onClick}
        >
            {value}
        </button>
  )
  return (
        <>
            {
                url
                  ? (
                    <a href={url} >
                        {button}
                    </a>
                    )
                  : (
                      button
                    )
            }
        </>
  )
}
