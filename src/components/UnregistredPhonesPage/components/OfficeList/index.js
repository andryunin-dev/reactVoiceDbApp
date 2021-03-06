/** @jsxRuntime classic */
/**@jsx jsx*/
import {jsx, css} from '@emotion/core'
import DropdownList from '@maximus905/dropdown-list'
import {Button} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import axios from 'axios'

async function dropdownListData ({url, accessor, filters, sorting, dataFieldName}) {
    const data = Array.from(Array(5), () => 0).map((value, index) => `item-${index} another long text and so on`)
    data.push(true, false)
    console.log('data', data, accessor, filters, sorting, dataFieldName)
    return new Promise(resolve => {
        setTimeout(() => {resolve({data})}, 500)
    })
}
const officeLoader = async ({url, accessor, filters, sorting, dataFieldName, labelFieldName, valueFieldName}) => {
    try {
        const res = await axios.get(url, {
            params: {accessor, filters, sorting, dataFieldName, labelFieldName, valueFieldName}
        })
        if (!Array.isArray(res.data[dataFieldName])) {
            console.log('invalid data from server: ', res)
            throw new Error('Error fetching data from server')
        }
        console.log('data from server: ', res)
        return res.data
    } catch (e) {
        alert(e.toString())
        return {[dataFieldName]: []}
    }
}


const OfficeList = ({onChangeSelected, buttonTitle, dataUrl, accessor, disabled}) => {
    const btnStyle = css`
  min-width: 250px;
  max-width: 600px;
  color: white;
  background-color: rgb(62,148,224);
  &:hover {
  background-color: rgb(35,89,130);
  }
`
    const DDButton = ({buttonRef, checkedItemsValue, checkedItemsLabel, disabled}) => (
            <Button className="d-flex justify-content-between w-100" innerRef={buttonRef} css={btnStyle} disabled={disabled}>
                <div title={checkedItemsLabel.join(',')}>{(checkedItemsLabel.join(','))  || 'Выберите офис'}</div>
                <div className="pl-1"><FontAwesomeIcon icon={faAngleDown}/></div>
            </Button>
        )

    return <DropdownList accessor={accessor} dataUrl={dataUrl} buttonContainerWidth="100%" buttonIcon={DDButton} maxHeight={400} widthMenuLikeButton minWidth={200} maxWidth={600} onChangeSelected={onChangeSelected} onOpen={()=>{}} onClose={()=>{}} closeAfterSelect disabled={disabled} />
}

OfficeList.propTypes = {
    ...DropdownList.propTypes,
    buttonTitle: PropTypes.string
}

export default OfficeList