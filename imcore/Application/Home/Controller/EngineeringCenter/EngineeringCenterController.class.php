<?php
namespace Home\Controller\EngineeringCenter;

use Think\Controller;

/*
 * 工程中心
 */
class EngineeringCenterController extends Controller {
	
    /**
     * 工程中心优势
     */
    public function superiorityAction(){
    	$this->display('EngineeringCenter:superiority');
    } 
    
    /**
     * 工程中心五步曲
     */
    public function fiveStepAction(){
    	$this->display('EngineeringCenter:fiveStep');
    }
    
    /**
     * 产品和解决方案
     */
    public function productSolutionAction(){
    	$this->display('EngineeringCenter:productSolution');
    }
    
    /**
     * 三五互联
     */
    public function sanWuProjectAction(){
    	$this->display('EngineeringCenter:sanWuProject');
    }
    
    /**
     * 海西晨报
     */
    public function chenBaoProjectAction(){
        $this->display('EngineeringCenter:chenBaoProject');
    }
    
    /**
     * 建发房产
     */
    public function jianfaProjectAction(){
    	$this->display('EngineeringCenter:jianfaProject');
    }
    
    
    
    
}