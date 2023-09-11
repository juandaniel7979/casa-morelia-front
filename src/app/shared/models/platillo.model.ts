

export interface Platillos{
  total:Number;
  platos:Platillo[];
}

export interface Platillo{
  id:string;
  nombre:string;
  precio:number;
  imagen:string;
  descripcion:string;
}



export interface CreatePlatilloDTO extends Omit<Platillo,'id'> {
}

export interface UpdatePlatilloDTO extends Partial<CreatePlatilloDTO>{}
