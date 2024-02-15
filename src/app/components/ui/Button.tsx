type ButtonType = 'submit' | 'reset' | 'button'

interface Props {
  type: ButtonType
  value: string
  url?: string
  onClick?: () => void
}

export default function Button ({ type, value, url, onClick }: Props): JSX.Element {
  const button = (
    <div>
      <button
        className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6
        text-white shadow-sm hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-primary"
        onClick={onClick}
        type={type}
      >
        {value}
      </button>
    </div>
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
