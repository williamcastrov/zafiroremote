import React, { Fragment, useEffect, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import MaterialTable from "material-table";
import axios from "axios";
import CancelIcon from "@material-ui/icons/Cancel";
import { Modal, Button, Form, Input, Typography, Row, Col, Select, InputNumber } from "antd";
import EditAttributesIcon from "@material-ui/icons/EditAttributes";
import Moment from "moment";
import swal from "sweetalert";

const { Item } = Form;
const { Password } = Input;
const { Title } = Typography;

import EditIcon from "@material-ui/icons/Edit";
// Componentes de Conexion con el Backend
import consumosRepuestosServices from "../../../services/GestionOrdenes/ConsumosRepuestos";

import "./CostosOT.css";
import { data } from "jquery";

function CostosOT(props) {
  const fechaactual = Moment(new Date()).format("YYYY-MM-DD");
  //const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  const [itemUpdate, setItemUpdate] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const [leerTodos, setLeerTodos] = useState(false);
  const [pendienteCrear, setPendienteCrear] = useState([]);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(false);

  //console.log("IMAGEN : ", imagen1)

  useEffect(() => {
    const listarItems = async () => {
      const res = await consumosRepuestosServices.listarconsumosmesequipo(props.id_actividad);
      //console.log("DATOS : ", res)
      //return
      if (res.success) {
        setPendienteCrear(res.data)
      } else {
        console.log(res.message);
      }
    }
    listarItems();
    setActualizar(false);
  }, [actualizar]);

  const grabarDatos = (datos) => {

    let dato = [];
    let valtot = datos.costounitario_cre * datos.cantidad_cre;

    let item = {
      id_cre: datos.id_cre,
      ot_cre: datos.ot_cre,
      tipo_cre: datos.tipo_cre,
      concepto_cre: datos.concepto_cre,
      proveedor_cre: datos.proveedor_cre,
      cantidad_cre: datos.cantidad_cre,
      costounitario_cre: datos.costounitario_cre,
      costototal_cre: valtot
    }

    dato.push(item);
    //return
    const actualizarItem = async () => {
      const res = await consumosRepuestosServices.update(dato[0]);

      if (res.success) {
        swal("Costos OT", "Item costo actualizado!", "success", { button: "Aceptar" });
        //console.log(res.message)
        setActualizar(true);
      } else {
        swal("Costos OT", "Error Actualizando Item costo!", "error", { button: "Aceptar" });
        //console.log(res.message);
      }
    }
    actualizarItem();
  };

  const crearElemento = (datos) => {
    let item = {
      ot_cre: props.id_actividad,
      concepto_cre: "",
      proveedor_cre: "",
      cantidad_cre: 0,
      costounitario_cre: 0,
      costototal_cre: 0
    }

    const crear = async () => {
      const res = await consumosRepuestosServices.save(item);

      if (res.success) {
        //swal("Costos OT", "Item costo grabado!", "success", { button: "Aceptar" });
        console.log("ITEM COSTOS OK")
        setActualizar(true);
      } else {
        //swal("Costos OT", "Error Actualizando Item costo!", "error", { button: "Aceptar" });
        console.log("ERROR ITEM COSTOS OK");
      }
    }
    crear();
  }

  const abrirModalEliminar = () => {
    setModalEliminar(true);
  }

  const cerrarModalEliminar = () => {
    setModalEliminar(false);
  }

  const eliminarItem = async () => {
    const borrar = async () => {
      const res = await consumosRepuestosServices.delete(itemSeleccionado);

      if (res.success) {
        swal("Costos OT", "Item costo eliminado!", "success", { button: "Aceptar" });
        cerrarModalEliminar();
        //console.log(res.message)
        setActualizar(true);
      } else {
        swal("Costos OT", "Error Eliminando Item costo!", "error", { button: "Aceptar" });
        cerrarModalEliminar();
        //console.log(res.message);
      }
    }
    borrar();
  }


  const columnas = [
    {
      field: 'ot_cre',
      title: '# OT',
      cellStyle: { minWidth: 10 },
      cellStyle: { maxWidth: 10 }
    },
    {
      field: 'concepto_cre',
      title: 'Concepto',
      cellStyle: { minWidth: 200 },
      cellStyle: { maxWidth: 200 }
    },
    {
      field: 'tipo_cre',
      title: 'Tipo Costo',
      lookup: { 1: 'Mano de obra', 2: 'Repuestos', 3: 'Insumos',},
      cellStyle: { minWidth: 200 },
      cellStyle: { maxWidth: 200 },
    },
    {
      field: 'proveedor_cre',
      title: 'Nombre proveedor',
      cellStyle: { minWidth: 200 },
      cellStyle: { maxWidth: 200 }
    },
    {
      field: 'cantidad_cre',
      title: 'Cantidad',
      cellStyle: { minWidth: 10 }
    },
    {
      field: 'costounitario_cre',
      title: 'Valor unitario',
      cellStyle: { minWidth: 50 },
      cellStyle: { maxWidth: 50 }
    },
    {
      field: 'costototal_cre',
      title: 'Valor total',
      editable: 'never',
      cellStyle: { minWidth: 50 }
    },
  ]

  const seleccionarItem = (datos, caso) => {
    setItemSeleccionado(datos.id_cre);
    (caso === "Eliminar") ? abrirModalEliminar() : abrirModalEliminar()
  }

  return (
    <div>
      <Title align="center" type="warning" level={4} onClick={() => crearElemento()}>
        <Button className="button">
          Crear elemento
        </Button>
      </Title>
      <Modal
        title="ELIMINAR ITEM" visible={modalEliminar}
        onOk={cerrarModalEliminar}
        width={600}
        closable={false}
        footer={[
          <Button type="primary" danger onClick={() => eliminarItem()} > Eliminar </Button>,
          <Button variant="contained" danger onClick={cerrarModalEliminar} > Regresar </Button>,
        ]}
      >
        {eliminarItem}
      </Modal>

      <MaterialTable
        title="COSTOS OT"
        columns={columnas}
        data={pendienteCrear}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...pendienteCrear];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setPendienteCrear([...dataUpdate]);
                setItemUpdate(newData);
                grabarDatos(newData);
                resolve();
              }, 1000)
            }),

        }}
        options={{
          actionsColumnIndex: 11,
          headerStyle: { backgroundColor: '#9E9E9E', fontSize: 14, color: 'white' },
          rowStyle: rowData => ({
            backgroundColor: (0 == rowData.sincodigosiigo) ? '#6699D0' : '#FFF'
          })
        }}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Eliminar Item',
            onClick: (event, rowData) => seleccionarItem(rowData, "Eliminar")
          },
        ]}
      />
    </div>
  );
}

export default CostosOT;