import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const filters = [
  {value: "Todas", active: true},
  {value: "Desayuno", active: false},
  {value: "Almuerzo", active: false},
  {value: "Merienda", active: false},
  {value: "Cena", active: false},
  {value: "Picada", active: false},
  {value: "Vegetariano", active: false},
  {value: "Keto", active: false},
  {value: "Pastas", active: false},
  {value: "Pescado y mariscos", active: false},
]
export const RecipeFilter = () => {
  return (
    <Card className="h-fit sticky top-4 hidden md:block">
      <CardHeader>
        <CardTitle>Filtrar recetas</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 flex-wrap">
        {filters.map((filter, index) => {
          return <Button variant={filter.active ? "default" : "outline"} key={index}>{filter.value}</Button>
        })}
      </CardContent>
    </Card>
  )
}
