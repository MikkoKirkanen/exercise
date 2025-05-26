import {
  Alert,
  AlertColor,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { FormEvent, useState } from 'react'

interface Props {
  coordinates: number[]
}

export function HedgehogForm({ coordinates }: Props) {
  const [name, setName] = useState('')
  const [age, setAge] = useState<number | ''>('')
  const [gender, setGender] = useState('unknown')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [alertType, setAlertType] = useState<AlertColor>('success')

  const handleAge = (val: string) => {
    setAge(val === '' ? '' : Number(val))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!coordinates?.length) {
      setMessage('Valitse sijainti kartalta.')
      setAlertType('warning')
      return
    }

    const hedgehogData = {
      name,
      age,
      gender,
      coordinates,
    }

    try {
      setSubmitting(true)
      const res = await fetch('/api/v1/hedgehog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hedgehogData),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }
      const json = await res.json()
      setMessage('Siilin lisäys onnistui.')
      setAlertType('info')
    } catch (error) {
      setMessage('Lisäyksessä tapahtui virhe.')
      setAlertType('error')
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        margin: '1em 0em 1em 0em',
        padding: '1em',
      }}
    >
      {/* <Typography>
        TODO: Luo tähän lomake painikkeineen, jonka avulla uusia siilihavaintoja
        saa lisättyä palveluun.
      </Typography>
      <br />
      <Typography>
        Siililtä kysyttävät tiedot: nimi, ikä, sukupuoli. Lisäksi siilin
        havainnon yhteydessä merkitään havainnon sijainti kartalla. Kartalta
        saadaan koordinaattipiste tälle HedgehogForm:lle klikkaamalla karttaa
        (kts. consolin logit). Tämä koordinaattipiste tulee tallentaa
        tietokantaan muiden tietojen oheen. PostGIS tarjoaa koordinaateille
        sopivan tietokantatyypin koordinaattien tallennukseen. Yllä olevat
        tiedot tulee tallentaa tietokantaan sopivalla HTTP pyynnöllä siilien
        tietokantaan.
      </Typography> */}
      <Typography variant='h6' gutterBottom>
        Lisää siilihavainto
      </Typography>
      <Box component='form' onSubmit={handleSubmit}>
        {message && (
          <Alert severity={alertType} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        <TextField
          label='Nimi'
          fullWidth
          margin='normal'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label='Ikä'
          type='number'
          fullWidth
          margin='normal'
          required
          value={age}
          onChange={(e) => handleAge(e.target.value)}
        />
        <FormControl component='fieldset' sx={{ mb: 2 }}>
          <FormLabel component='legend'>Sukupuoli</FormLabel>
          <RadioGroup
            row
            name='gender'
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel
              value='unknown'
              control={<Radio />}
              label='Tuntematon'
            />
            <FormControlLabel
              value='female'
              control={<Radio />}
              label='Naaras'
            />
            <FormControlLabel value='male' control={<Radio />} label='Uros' />
          </RadioGroup>
        </FormControl>

        <Box sx={{ mb: 3 }}>
          <Typography>Valittu sijainti:</Typography>
          {coordinates?.length ? (
            `${coordinates[0]}, ${coordinates[1]}`
          ) : (
            <span style={{ color: 'red' }}>Ei valittu</span>
          )}
        </Box>

        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={submitting}
        >
          {submitting ? 'Tallennetaan...' : 'Lisää havainto'}
        </Button>
      </Box>
    </Paper>
  )
}
