import React from 'react'
import {Route} from 'react-router-dom'
import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import {connect} from 'react-redux'
import {updateCollections} from '../../redux/shop/shop.actions'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionPage from '../collection/collection.component.'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'







const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)
class ShopPage extends React.Component {
    
    state={
        loading:true
    }

    unsubscribeFromSnapshot = null;


    componentDidMount(){
        const {updateCollections} = this.props
        const collectionRef = firestore.collection("collections")
     
        //fetch("https://firestore.googleapis.com/v1/projects/crwn-db/databases/(default)/documents/collections")
     
        collectionRef.onSnapshot.get().then(
        snapshot=>{
            const collectionsMap =  convertCollectionsSnapshotToMap(snapshot)
         updateCollections(collectionsMap)
         this.setState({loading:false})
         }
     )
    //when you get a snapshot from firestore
    }

    render() {
        const {match}  = this.props
        const {loading}  = this.state;
      
        return (
            <div className="shop-page">
        <Route 
        exact path ={`${match.path}`} 
        render = {(props)=><CollectionsOverviewWithSpinner isLoading={loading} {...props} /> } /> 
        <Route 
        path = {`${match.path}/:collectionId`} 
        render = {(props)=><CollectionPageWithSpinner isLoading={loading} {...props} />}
        /> 
        </div> 
        );
    }
}

const mapDispatchToProps = dispatch=>({
    updateCollections:collectionsMap=>dispatch(updateCollections(collectionsMap)
        )
})

export default connect(null, mapDispatchToProps)(ShopPage);