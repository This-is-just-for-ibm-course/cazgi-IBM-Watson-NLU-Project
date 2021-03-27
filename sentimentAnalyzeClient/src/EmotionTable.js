import React from 'react';
import './bootstrap.min.css';
 
class EmotionTable extends React.Component {

    render() {
            console.log(Object.entries(this.props.emotions))

      return (  
        <div>
          {/*You can remove this line and the line below. */}
          <table className="table table-bordered">
            <tbody>
             
            {
                Object.entries(this.props.emotions).map(([key,val])=><tr key = {key}><td>{key}</td><td>{val}</td></tr>)
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
