<?php

namespace App\Http\Controllers\API\GestionOrdenes;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GestionOrdenes\ConsumosRepuestos;

class ConsumosRepuestosController extends Controller
{
    public function create(Request $request){
        try {
            $insert['id_cre']            = $request['id_cre'];
            $insert['ot_cre']            = $request['ot_cre'];
            $insert['tipo_cre']          = $request['tipo_cre'];
            $insert['concepto_cre']      = $request['concepto_cre'];
            $insert['proveedor_cre']     = $request['proveedor_cre'];
            $insert['cantidad_cre']      = $request['cantidad_cre']; 
            $insert['costounitario_cre'] = $request['costounitario_cre'];
            $insert['costototal_cre']    = $request['costototal_cre']; 
            
            ConsumosRepuestos::insert($insert);
    
            $response['message'] = "Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
      }
  
      public function listar_consumosrepuestos(){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*
            FROM consumosrepuestos as t0");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function listar_consumosrepuestosperiodo($periodo){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*
            FROM consumosrepuestos as t0
            WHERE t0.periodo_cre = $periodo");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function listar_consolidaconsrep(){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT ot_cre, codigo_cre, sum(cantidad_cre) as cantidad_cre, 
                                       costounitario_cre, sum(costototal_cre) as costototal_cre, sum(valorbruto_cre) as valorbruto_cre
            FROM consumosrepuestos as t0
            GROUP BY ot_cre, costounitario_cre");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }


      public function listar_consumosmesequipo($ot_cre){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*
            FROM consumosrepuestos t0
            WHERE t0.ot_cre = $ot_cre");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }


      public function update(Request $request, $id_cre){
        try {
          $data['ot_cre']            = $request['ot_cre'];
          $data['concepto_cre']      = $request['concepto_cre'];
          $data['tipo_cre']          = $request['tipo_cre'];
          $data['proveedor_cre']     = $request['proveedor_cre'];
          $data['cantidad_cre']      = $request['cantidad_cre']; 
          $data['costounitario_cre'] = $request['costounitario_cre'];
          $data['costototal_cre']    = $request['costototal_cre']; 
    
          $res = ConsumosRepuestos::where("id_cre",$id_cre)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_cre){ 
        try {
          $res = ConsumosRepuestos::where("id_cre",$id_cre)->delete($id_cre);
          $response['res'] = $res;
    
          $response['message'] = "Deleted successful";
          $response['success'] = true; 
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
          return $response;
      }
      
}
