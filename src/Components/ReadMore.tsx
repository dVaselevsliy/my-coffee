import { useState } from "react"

type Props = {
  text: string
}

export const ReadMore: React.FC<Props> = ({ text }) => {
  const [readMore, setReadMore] = useState(false)

  const textShortVersion = text.slice(0, 100)
   
  return (
    <span>
      {
        text.length > 100 ? (
          <>
            {textShortVersion}
            <br />
            {!readMore && (
              <span
                className="button-read-more"
                onClick={() => {
                  setReadMore(true)
                }}>
                Read More...
              </span>
            )}
            {readMore && text.slice(100)}
            {readMore && (
              <span
                className="button-read-more"
                onClick={() => {
                  setReadMore(false)
                }}
              >
                Hide
              </span>
            )}
          </>
        ) : (
          text
        )
      }
   </span>
  ) 
}