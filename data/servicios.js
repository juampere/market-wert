// data/servicios.js
import AtencionIcon from '@/components/icons/AtencionIcon';
import CalidadIcon from '@/components/icons/CalidadIcon';
import EnvioIcon from '@/components/icons/EnvioIcon';
import DisenoIcon from '@/components/icons/DisenoIcon';


export const servicios = [
  {
    id: 1,
    titulo: 'Atención Personalizada',
    descripcion: 'Asesoramiento directo para encontrar la solución perfecta para tu campo.',
    Icono: AtencionIcon, 
  },
  {
    id: 2,
    titulo: 'Diseño a Medida',
    descripcion: 'Adaptamos nuestras estructuras a las necesidades específicas de tu establecimiento.',
    Icono: DisenoIcon, 
  },
  {
    id: 3,
    titulo: 'Logística y Envío',
    descripcion: 'Coordinamos el flete para entregar los productos en la tranquera de tu campo.',
    Icono: EnvioIcon,
  },
  {
    id: 4,
    titulo: 'Calidad Garantizada',
    descripcion: 'Utilizamos maderas duras seleccionadas para una máxima vida útil.',
    Icono: CalidadIcon, 
  },
];