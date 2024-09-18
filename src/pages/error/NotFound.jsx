import { Drumstick } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <div className='flex flex-col h-screen items-center justify-center gap-4 mt-[-57px]'>
      <Drumstick size={80} />
      <h1 className='text-4xl font-semibold'>404</h1>
      <p className='text-muted-foreground'>La página que estás buscando no existe</p>
      <Button>
        <Link to="/">Volver a la página principal</Link>
      </Button>
    </div>
  )
}

export default NotFound
