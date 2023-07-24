import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { connect } from 'react-redux';
import { useState, useEffect } from "react";
import { onSnapshot, collection, setDoc, addDoc, doc } from '@firebase/firestore'
import db from '../../firebase';
import { getBalanceAction, getTransactionsAction } from '../../action';
const Modalpopup = (props) => {
  const [form, setForm] = useState({});
  const [balance, SetBalance] = useState({});
  const [validationErrors, setValidationErrors] = useState({
    date: false,
    time: false,
    cost: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target

    form[name] = value;

    setForm(form)
  }

  const validateForm = () => {
    const errors = {
      date: form.date === '' || form.date == undefined,
      time: form.time === '' || form.time == undefined,
      cost:  (form.credit== undefined  && form.debit== undefined )|| (form.credit === '' && form.debit===''),
    };
    setValidationErrors(errors);
    return Object.values(errors).every((error) => !error);
  };
  const handleAdd = async () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      let payload = {};
      payload = balance
      if (props.trType == "Credit") {
        payload.credit = parseInt(balance.credit) + parseInt(form.credit);
      }
      else {
        payload.debit = parseInt(balance.debit) + parseInt(form.debit);
      }
      payload.balance = payload.credit - payload.debit
      SetBalance(payload)

      let collectionRef = collection(db, "Transactions");
      const entry = await addDoc(collectionRef, form)
      await setDoc(doc(db, "total", "sjUlgGgJlp4qIElxhXdB"), payload)
      if (entry) {
        setForm({})
        getBalanceAction()
        getTransactionsAction()
        props.SetIsActive(false)
      }
    }
  };



  useEffect(() => {

    if (props.total != undefined) {
      SetBalance(props.total[0])
    }

  }, [props.total])
  const close = ()=>{
    props.SetIsActive(false);
     setForm({})
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <Dialog

        open={props.IsActive} onClose={e => close(e)} fullWidth maxWidth="sm">
        <DialogTitle>Add {props.trType} Transaction<IconButton onClick={e =>close(e)} style={{ float: 'right' }}>X</IconButton>  </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField type="date"
              label="Date *"
              name="date"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={form.date}
              onChange={e => handleChange(e)}
              error={validationErrors.date}
              helperText={validationErrors.date ? 'Date is required' : ''} />
            <TextField type="time"
              label="Time *"
              name="time"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={form.time}
              onChange={e => handleChange(e)}
              error={validationErrors.time}
              helperText={validationErrors.time ? 'Time is required' : ''} />

            <TextField type="string" multiline
              rows={4}
              label="Description"
              name="description"
              variant="outlined"
              value={form.desctiprion}
              onChange={e => handleChange(e)} />

            <TextField type="number"
              label={props.trType + " Amount *"}
              name={props.trType.toLowerCase()}
              variant="outlined"
              value={form.cost}
              onChange={e => handleChange(e)}
              error={validationErrors.cost}
              helperText={validationErrors.cost ? 'Amount is required' : ''} />

            <FormControl size='large'>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={form.category}
                label="Category"
                onChange={handleChange}
                name="category"
              >
                <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                <MenuItem value={"Food"}>Food</MenuItem>
                <MenuItem value={"Bills"}>Bills</MenuItem>
                <MenuItem value={"Grocery"}>Grocery</MenuItem>
                <MenuItem value={"Shopping"}>Shopping</MenuItem>
                <MenuItem value={"Salary"}>Salary</MenuItem>
                <MenuItem value={"Gift"}>Gift</MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={e => handleAdd()} variant="contained">Save</Button>
          <Button onClick={e => close(e)} color="error" variant="contained">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const getPropsData = state => {
  return {
    userdata: state.app.transactions,
    total: state.app.total
  }
}

export default connect(getPropsData, {})(Modalpopup)
