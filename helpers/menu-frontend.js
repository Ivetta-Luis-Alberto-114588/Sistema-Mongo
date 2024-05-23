

const getMenuFrontEnd = ( role = 'USER_ROLE' ) => {
    const menu =   [
        {titulo: 'Principal',
        icono: 'mdi mdi-gauge',
        submenu: [
          {titulo: 'main', url: '/'},
          {titulo: 'progressBar', url: 'progress'},
          {titulo: 'graficas', url: 'grafica1'},
          {titulo: 'promesas', url:'promesas'},
          {titulo: 'rxjs', url:'rxjs'}
        ]  
        },
        {titulo: 'Mantenimiento',
        icono: 'mdi mdi-folder-lock-open',
        submenu: [
        //   {titulo: 'Usuarios', url: 'usuarios'},
          {titulo: 'Hospitales', url: 'hospitales'},
          {titulo: 'Medicos', url: 'medicos'}
       
        ]  
        },
    
      ]

      if (role === 'ADMIN_ROLE'){
        //si el role es admin entonces agrego a la primer posicion del arreglo
        menu[1].submenu.unshift({titulo: 'Usuarios', url : 'usuarios'})
      }

      // a este menu lo voy a regreser en el login, en el googlesingin y en renewToken, que estan en los
      //controladores del auth
      return menu
}

module.exports = {
    getMenuFrontEnd
}