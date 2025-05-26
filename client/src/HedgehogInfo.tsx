import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import { Hedgehog } from '@shared/hedgehog'
import { useEffect, useState } from 'react'

interface Props {
  hedgehogId: number | null
}

export function HedgehogInfo({ hedgehogId }: Props) {
  const [hedgehog, setHedgehog] = useState<Hedgehog | null>(null)

  useEffect(() => {
    const getHedgehog = async () => {
      if (hedgehogId === null) return
      console.log('hedgehogId', hedgehogId)
      try {
        const res = await fetch('/api/v1/hedgehog/' + hedgehogId)
        if (!res.ok) return
        const hedgehog = await res.json()
        console.log(hedgehog)
        setHedgehog(hedgehog)
      } catch (err) {
        console.error(`Error while fetching hedgehog: ${err}`)
      }
    }
    getHedgehog()
  }, [hedgehogId])

  const labelCellStyle = {
    fontWeight: 'bold',
    width: 0,
    whiteSpace: 'nowrap',
  }

  const translateGender = (gender: string | undefined): string => {
    if (!gender) return ''
    switch (gender) {
      case 'male':
        return 'Uros'
      case 'female':
        return 'Naaras'
      case 'unknown':
        return 'Tuntematon'
      default:
        return gender
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
      <Typography variant='h5' sx={{ mb: 2 }}>
        Siilin tiedot
      </Typography>
      <Table size='small'>
        <TableBody>
          <TableRow>
            <TableCell sx={labelCellStyle}>Nimi</TableCell>
            <TableCell>{hedgehog?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={labelCellStyle}>Ikä</TableCell>
            <TableCell>{hedgehog?.age}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={labelCellStyle}>Sukupuoli</TableCell>
            <TableCell>{translateGender(hedgehog?.gender)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}
