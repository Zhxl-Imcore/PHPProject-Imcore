<?php

namespace Admin\Model;

use Think\Model\RelationModel;

/**
 * 果核动态
 * @author zhxl
 *
 */
class NewsModel extends RelationModel {
	
	/**
	 * 字段信息
	 */
	protected $fields = array(
		'id',
		'title',
		'content',
		'image_ids',
		'publisher',
		'publish_time',
		'is_stick',
		'status'
	);
	
	/**
	 * 自动设置字段的默认值
	 */
	/**
	protected $_auto = array(
		
	);*/
	
	/**
	 * 定义关联关系
	 */
	protected $_link = array(
		'User' => array(
			//关联类型
			'mapping_type' => self::BELONGS_TO,
			//关联模型名（可选）
			'class_name' => 'User',
			//News表中的外键
			'foreign_key' => 'publisher',
			//关联表的别名(不可与当前表字段名重复)
			'mapping_name' => 'user',
			//要查询的字段名
	
			'mapping_fields' => array(
					'account'
			),
			/*
			//直接把关联的字段值映射成数据对象中的某个字段(ONE_TO_ONE特有)
			'as_fields' => array(
					'account:publisher_name'
			),
			*/
		),
	);
}




