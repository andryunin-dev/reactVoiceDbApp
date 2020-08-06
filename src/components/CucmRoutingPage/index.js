/**@jsx jsx*/
import {jsx, css} from '@emotion/core'
import CucmList from "./components/CucmList";
import CucmRoutesTable from "./components/CucmRoutesTable";
import {Button, Input} from 'reactstrap'
import {useRef, useState} from 'react'

const CucmRoutingPage = (props) => {
  const [pattern, setPattern] = useState('')
  const [cucm, setCucm] = useState('')
  const [loading, setLoading] = useState(false)
  const [extFilter, setExtFilter] = useState({cucm: '', pattern: ''})
  const refStorage = useRef({onFocus: false})

  const onClickHandler = () => cucm && pattern && setExtFilter(prevState => ({cucm, pattern}))
  const onChangePattern = (e) => setPattern(e.target.value)
  const onChangeSelectedCucm = ({accessor, value}) => {
    setCucm(value.pop())
  }
  const onKeyDown = e => {
    if (refStorage.current.onFocus && e.key.toLowerCase() === 'enter') onClickHandler()
  }
  const onFocus = () => refStorage.current.onFocus = true
  const onBlur = () => refStorage.current.onFocus = false

  return (
    <div css={css`display: flex; flex-direction: column; height: 100%`}>
      <div className="row">
        <div className="col pt-1 pb-1 d-flex">
          <div>
            <CucmList onChangeSelected={onChangeSelectedCucm}/>
          </div>
          <div className="ml-2 ">
            <Input onChange={onChangePattern} onKeyDown={onKeyDown} onFocus={onFocus} onBlur={onBlur} />
          </div>
          <Button className="ml-2" css={css`background-color: rgb(62,148,224)`} onClick={onClickHandler} disabled={!(cucm && pattern) || loading}>Search</Button>
        </div>
      </div>
      <div css={css`flex-grow: 1; min-height: 0`}>
        <CucmRoutesTable extFilter={extFilter} setLoading={setLoading} />
      </div>
    </div>
  )
}
export default CucmRoutingPage