import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

//spinner code taken from ant design
const Spinner = () => (
    <Spin
        indicator={
            <LoadingOutlined
                style={{
                    fontSize: 24,
                }}
                spin
            />
        }
    />
);
export default Spinner;