import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getPasswordById} from "../../store/passwords/passwords.selector";
import React from 'react'
import {EditRecord} from "./EditRecord.component";

export const EditRecordView = () => {
  const {id} = useParams()
  const configuration = useSelector(state => getPasswordById(state, id))

  return (
    <EditRecord configuration={configuration} id={id}/>
  )
}