<?php
namespace Admin\Model;

use Think\Model;
/**
 * 图片模型
 */
class ImageModel extends Model {
	
	/**
	 * 表名
	 */
	protected $trueTableName = 't_image';
	
	/**
	 * 字段
	 */
	protected $fields = array(
		'id',
		'name',
		'path',
		'category',
		'type',
		'fid'
	);
}
