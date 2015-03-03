<?php
namespace Admin\Model;

use Think\Model\RelationModel;

/**
 * 广告页幻灯片
 */
class AdvSlideShowModel extends RelationModel {
	
	// 数据表名（不包含表前缀）
	protected $tableName = 'adv_slideshow';
	
	protected $fields = array(
		'id',
		'title',
		'hyperlink',
		'photo_path',
		'order',
		'author_id',
		'create_time',
		'update_time',
		'status',
		'_pk' => 'id'
	);
	
	/**
	 * 自动完成
	 */
	protected $_auto = array(
		array('create_time','date',self::MODEL_INSERT,'function',array('Y-m-d H:i:s')),
		array('update_time','date',self::MODEL_BOTH,'function',array('Y-m-d H:i:s')),
	);
	
	/**
	 * 多表关联
	 */
	protected $_link = array(
		'User' => array(
			//关联类型
			'mapping_type' => self::BELONGS_TO,
			//关联模型名（可选）
			'class_name' => 'User',
			//News表中的外键
			'foreign_key' => 'author_id',
			//关联表的别名(不可与当前表字段名重复)
			'mapping_name' => 'user',
			//要查询的字段名
	
			'mapping_fields' => array(
				'account'
			),
		),
	);
}