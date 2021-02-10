import React from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import CollectionPageContainer from '../collection/collection.container'
import {fetchCollectionsStart} from '../../redux/shop/shop.actions'
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.component'



class ShopPage extends React.Component {
    
    state={
        loading:true
    }

    unsubscribeFromSnapshot = null;
        //fetch("https://firestore.googleapis.com/v1/projects/crwn-db/databases/(default)/documents/collections")

    UNSAFE_componentWillMount(){

    }
    componentDidMount(){
     const {fetchCollectionsStart} = this.props;
     fetchCollectionsStart()
    //when you get a snapshot from firestore
    }

    render() {
        const {match}  = this.props
      
        return (
            <div className="shop-page">
        <Route 
        exact path ={`${match.path}`} 
        component = {CollectionsOverviewContainer}
        /> 
        <Route 
        path = {`${match.path}/:collectionId`} 
        component = {CollectionPageContainer}
/> 
        </div> 
        );
    }
}




const mapDispatchToProps = dispatch=>({
   fetchCollectionsStart:()=>dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);