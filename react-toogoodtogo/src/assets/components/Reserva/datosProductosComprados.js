import fundaPanes from '../../images/funda_panes.jpeg';
import fundaCroissants from '../../images/funda_croissants.jpeg';
import paqueteGalletas from '../../images/paquete_galletas.jpeg';


 const products=[
    {
        imgProducto: fundaPanes,
        nombrePromocion: 'Fundas secretas de pan', 
        descripcion: 'Fundas sorpresa con 5 pan, no sabes que te tocará. Horneados el mismo día.',
        precio: 0.90,
    },
    {
        imgProducto: fundaCroissants,
        nombrePromocion: 'Paquete secreto de croissants',
        descripcion: 'Paquete sorpresa de 5 croissants, no sabes que te tocará. Horneados el mismo día.',
        precio: 3.25,
    },
    {
        imgProducto: paqueteGalletas,
        nombrePromocion: 'Paquete secreto de minigalletas',
        descripcion: 'Paquete sorpresa de 10 minigalletas, no sabes que te tocará. Horneadas el mismo día.',
        precio: 1.50,
    }

];
export default {products};

