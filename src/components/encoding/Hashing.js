import React, { useState } from 'react';
import { Button, Input, Typography, Menu, Dropdown, Divider, message } from 'antd';
import { CopyOutlined, DownOutlined, ArrowsAltOutlined, createFromIconfontCN } from '@ant-design/icons';
import MD5 from 'crypto-js/md5';
import SHA1 from 'crypto-js/sha1';
import SHA256 from 'crypto-js/sha256';
import SHA512 from 'crypto-js/sha512';
import Sm3 from 'sm3';
import Clipboard from 'react-clipboard.js';
import QueueAnim from 'rc-queue-anim';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const IconFont = createFromIconfontCN({
	scriptUrl: [ './iconfont.js' ]
});

const HashEncode = () => {
	const [ input, setInput ] = useState('');
	const [ hashtype, setHashType ] = useState('0');
	const [ hashname, setHashname ] = useState('MD5');
	const [ output, setOutput ] = useState('');
	const handleClick = (type) => {
		setHashType(type.key);
		resolvehashname(type.key);
	};
	const handleEncode = (hashtype) => {
		if (hashtype === 'MD5') {
			setOutput(MD5(input));
		} else if (hashtype === 'SHA1') {
			setOutput(SHA1(input));
		} else if (hashtype === 'SHA256') {
			setOutput(SHA256(input));
		} else if (hashtype === 'SHA512') {
			setOutput(SHA512(input));
		} else if (hashtype === 'SM3') {
			setOutput(Sm3(input));
		}
	};
	const successInfoHashing = () => {
		message.success('复制成功！');
	};
	const resolvehashname = (hashindex) => {
		switch (hashindex) {
			case '0':
				setHashname('MD5');
				console.log('md5');
				break;
			case '1':
				setHashname('SHA1');

				break;
			case '2':
				setHashname('SHA256');

				break;
			case '3':
				setHashname('SHA512');
				break;

			case '4':
				setHashname('SM3');
				break;

			default:
				return '请选择Hash类型';
		}
	};

	const menu = (
		<Menu onClick={handleClick}>
			<Menu.Item key='0' onClick={() => handleEncode('MD5')}>
				MD5
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key='1' onClick={() => handleEncode('SHA1')}>
				SHA1
			</Menu.Item>
			<Menu.Item key='2' onClick={() => handleEncode('SHA256')}>
				SHA256
			</Menu.Item>
			<Menu.Item key='3' onClick={() => handleEncode('SHA512')}>
				SHA512
			</Menu.Item>
			<Menu.Item key='4' onClick={() => handleEncode('SM3')}>
				SM3
			</Menu.Item>
		</Menu>
	);

	const handleChange = (name) => (event) => {
		setInput(event.target.value);
	};

	return (
		<QueueAnim delay={300} duration={1500}>
			<Title variant='Title level={3}' style={{ fontWeight: 'bold', margin: 15 }}>
				Hash计算
			</Title>
			<Paragraph style={{ margin: 15 }}>
				Hash，一般翻译做散列、杂凑，或音译为哈希，是把任意长度的输入（又叫做预映射pre-image）通过散列算法变换成固定长度的输出，该输出就是散列值。
			</Paragraph>
			<Paragraph style={{ marginLeft: 15 }}>
				支持MD5,SHA1,SHA256,SHA512,SM3
			</Paragraph>
			<Divider dashed />
			<div key='a' style={{ margin: 15 }}>
				<TextArea
					rows={4}
					value={input}
					onChange={handleChange('input')}
					placeholder='输入要加密的值 (ex: s7ck.com)'
				/>
				<Dropdown overlay={menu}>
					<a className='ant-dropdown-link'>
						{hashname} <DownOutlined style={{ padding: 10 }} />
					</a>
				</Dropdown>
				<Button
					type='primary'
					style={{ marginBottom: 10, marginTop: 15 }}
					onClick={() => handleEncode(hashname)}
				>
					<IconFont type='icon-hash' /> Get Hash
				</Button>
			</div>
			<div key='b' style={{ margin: 15 }}>
				<TextArea
					rows={4}
					value={output}
					style={{ cursor: 'auto', marginTop: 15, color: '#777' }}
					placeholder='输出结果'
				/>
				<pre>密码哈希算法: {hashname}</pre>
				<Clipboard component='a' data-clipboard-text={output}>
					<Button type='primary' style={{ marginBottom: 10, marginTop: 15 }} onClick={successInfoHashing}>
						<CopyOutlined /> 复制
					</Button>
				</Clipboard>
				<Button type='dashed' style={{ marginBottom: 10, marginTop: 15, marginLeft: 10 }}>
					<a href='https://somd5.com/' target='_blank' rel='noopener noreferrer'>
						<ArrowsAltOutlined /> Somd5免费解密
					</a>
				</Button>
			</div>
			<Divider dashed />
		</QueueAnim>
	);
};

export default HashEncode;
