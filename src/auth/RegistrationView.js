import React, {Component} from 'react';
import {StyleSheet, View, Text, Image,
    KeyboardAvoidingView,
    Animated,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Easing,
    TextInput,
    SafeAreaView,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import Foect from 'foect';
import { Header, Icon, Button, Left, Right } from 'native-base';
import { HeaderBackButton } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { Toast } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import Modal from "react-native-modal";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import backgroundImage from '../../assets/images/wakimartlogoangled.png';
import correctImage from '../../assets/images/correct.png';
import Navbar from '../product/komponen/NavBar';
import spinner from '../../assets/images/loading.gif';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'react-native-material-textfield';


const MARGIN = 40;
var radio_props = [
    {label: "Laki - laki", value: "male" },
    {label: "Perempuan", value: "female" }
  ];
var province_data = [];
export default class RegistrationScreen extends Component {

    constructor() {
        super();
    
        this.state = {
          isLoading: false,
          showPass: true,
          press: false,
          username: "",
          password: "",
          isFocused: true,
          selectedOption: "",
          checked: 'first',
          province_raw : [],
          agentcode_valid:true,
          isModalVisible: false,
        };
        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
      }
    
    static navigationOptions = ({navigation}) => {
        return{
          header: null,/* <Header textHeader='Profile' /> */
          // headerTitle: "Pesanan Saya",
          headerTitleStyle: {
            color: 'black'
          },
          // headerLeft:(<HeaderBackButton onPress={()=>{navigation.goBack()}}/>)
       }
    }

    componentWillMount() {
        this.renderProvince();
    }  
    
    handleFocus = () => this.setState({isFocused: true})

    handleBlur = () => this.setState({isFocused: false})
    
    toggleModal = () => {
      this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    checkAgentCode = (agentcode) => {
        axios.get('https://wakimart.com/id/api/getagentbycode', {
          params: {
            agentcode: agentcode,
          }
        }).then(
          response => this.setState({ agentcode_valid: false }, () => {
            if (response.data!="")
            {
              this.setState({ agentcode_valid: true });
            }
          }) 
        );
        if (agentcode=="")
        {
          this.setState({ agentcode_valid: true });
        }
    }

    renderProvince = () => {
        let arr_province = [];
        
        axios.get('https://wakimart.com/id/api/fetchProvinces').then(
          response => this.setState({ province_raw: response.data.data }, () => {
            // console.log(this.state.province_raw);
            this.state.province_raw.forEach((itm, i) => {
              // arr_province.push(Object.assign({}, itm, this.state.province_raw[i]));
              arr_province.push({ id: this.state.province_raw[i]['id'], value: this.state.province_raw[i]['name'] });
            });
          }) 
        );
        this.province_data=arr_province;
        // this.setState({ province_data: arr_province}); 
    }

    renderCity = (province_name) => {
        console.log(province_name)
        let arr_city = [];
        axios.get('https://www.wakimart.com/id/api/fetchCities_rn', {
          params: {
            province_name: province_name,
          }
        }).then(
          response => this.setState({ city_raw: response.data.data }, () => {
            // console.log(this.state.province_raw);
            // console.log(response);
            this.state.city_raw.forEach((itm, i) => {
              arr_city.push({ id: this.state.city_raw[i]['id'], value: this.state.city_raw[i]['name'] });
            });
          }) 
        );
        this.city_data=arr_city;
        // this.setState({ city_data: arr_city}); 
    }

    showPass = () => {
        if (this.state.showPass === true)
        {
            this.setState({showPass: false});
        }
        else
        {
            this.setState({showPass: true});
        }
    }

    _onGrow = () => {
        Animated.timing(this.growAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();
    }
    
    _onPress = () => {
        
        if (this.state.isLoading) return;
        
        this.setState({isLoading: true});
        Animated.timing(this.buttonAnimated, {
          toValue: 1,
          duration: 200,
          easing: Easing.linear,
        }).start();
    
        setTimeout(() => {
          this._onGrow();
        }, 2000);
    
        setTimeout(() => {
        //   Actions.secondScreen();
          this.setState({isLoading: false});
          this.buttonAnimated.setValue(0);
          this.growAnimated.setValue(0);
        }, 2300);

        

        axios.post(
            'https://wakimart.com/id/api/login_rn', 
            {
               'login': this.state.username,
               'password': this.state.password,
            },
        ).then((response) => {
            if (response.status === 200)
            {
                AsyncStorage.setItem('user', JSON.stringify(response.data.data));
                this._goHome();
            }
        }).catch(() => {
            Toast.show({
                text: 'Email/Phonenumber or Password Wrong!',
                position: 'bottom',
                type: 'danger',
                buttonText: 'Dismiss',
                duration: 3000
              });
        });
      }

    _goHome = () => {
        this.props.navigation.replace('Profile');
    }
        
    _goBack = () => {
      this.props.navigation.goBack();
    }

    renderOption = (option, selected, onSelect, index) => {
        const style = selected ? { fontWeight: 'bold'} : {};
    //  wakimartlogoangled.png
        return (
          <TouchableWithoutFeedback onPress={onSelect} key={index}>
            <Text style={style}>{option}</Text>
          </TouchableWithoutFeedback>
        );
    }

    renderContainer = (optionNodes) => {
        return <View>{optionNodes}</View>;
    }

    setSelectedOption = (selectedOption) => {
        this.setState({
          selectedOption
        });
    }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [Dimensions.get('window').width - MARGIN, MARGIN],
      });
    const options = [
        "Laki - laki",
        "Perempuan"
    ];
    const options_luar = [
        "Male",
        "Female"
    ];
    const { checked } = this.state;
    var email_check=true;
    var email_err_msg="";
    var phone_check=true;
    var phone_err_msg="";
    var name_check=true;
    var name_err_msg="";
    var nik_check=true;
    var nik_err_msg="";
    var address_check=true;
    var address_err_msg="";
    var gender_check=true;
    var gender_err_msg="";
    var province_check=true;
    var province_err_msg="";
    var district_check=true;
    var district_err_msg="";
    var birth_year_check=true;
    var birth_year_err_msg="";
    var zipcode_check=true;
    var zipcode_err_msg="";
    const left = (
      <Left style={{flexDirection: 'row', top:-10, left:15,}}>
        <Button transparent onPress={() => this.props.navigation.replace('Login')}>
          <Icon name="ios-arrow-back" style={{fontSize: 35, color:"#2ace87"}} />
        </Button>
      </Left>
    );
    return (
      <SafeAreaView style={{backgroundColor:"#ffffff"}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={{marginTop: 40,}}>
        <Navbar left={left} title="Registrasi"/>
        </View>
        
        <View style={{marginTop: 20,}}>
        <Foect.Form
            defaultValue={{
                nik: '1234512345',
                name: 'Kocheng Oren',
                email: 'johnexample@doe.com',
                phone: '0824446689123',
                zipcode: '1234',
                agent_code: 'wkt1-234',
                address: 'ujung langit pojok bumi',
            }}
            onValidSubmit={model => {
                console.log(model);
                var url = "https://www.wakimart.com/id/api/register_rn";
                var pindah = this;
                
                axios.get(url, {
                    params: {
                      datane: model,
                    }
                }).then(function (response) {
                  if (response.data.errors!=null)
                  {
                    if (response.data.errors.email!=null)
                    {
                      email_check=false;
                      email_err_msg=response.data.errors.email;
                    }
                    if (response.data.errors.phone!=null)
                    {
                      phone_check=false;
                      phone_err_msg=response.data.errors.phone;
                    }
                    if (response.data.errors.name!=null)
                    {
                      name_check=false;
                      name_err_msg=response.data.errors.name;
                    }
                    if (response.data.errors.nik!=null)
                    {
                      nik_check=false;
                      nik_err_msg=response.data.errors.nik;
                    }
                    if (response.data.errors.address!=null)
                    {
                      address_check=false;
                      address_err_msg=response.data.errors.address;
                    }
                    if (response.data.errors.gender!=null)
                    {
                      gender_check=false;
                      gender_err_msg=response.data.errors.gender;
                    }
                    if (response.data.errors.province!=null)
                    {
                      province_check=false;
                      province_err_msg=response.data.errors.province;
                    }
                    if (response.data.errors.district!=null)
                    {
                      district_check=false;
                      district_err_msg=response.data.errors.district;
                    }
                    if (response.data.errors.birth_year!=null)
                    {
                      birth_year_check=false;
                      birth_year_err_msg=response.data.errors.birth_year;
                    }
                    if (response.data.errors.zipcode!=null)
                    {
                      zipcode_check=false;
                      zipcode_err_msg=response.data.errors.zipcode;
                    }
                  }
                  else
                  {
                    pindah.toggleModal();
                  }
                    // console.log(response.data);
                })
            }}
            >
            { /* you can use form for triggering submit or checking form state(form.isSubmitted, form.isValid, ...) */ }
            { form => (
                <View style={{ marginLeft: 40, marginRight: 40 }}>
                { /* every Foect.Control must have a name and optionally validation rules */ }
                <Foect.Control name="nik" minLength={2} maxLength={32}>
                    { /* you can use control for getting/setting it's value, checking/updating(control.isValid, control.markAsTouched(), ...) it's state, checking it's errors(control.errors.required) */ }
                    { control => (
                    <View style={styles.inputWrapperUserInput}>
                        <TextField
                          style={styles.inputUserInput}
                          name='nik'
                          label='NIK'
                          autoCorrect={false}
                          autoCapitalize="none"
                          returnKeyType='done'
                          baseColor={'#2b2b2b'}
                          tintColor={'#2ace87'}
                          value={control.value}
                          onChangeText={(text) => control.onChange(text)}
                        />
                        {
                          nik_check==false && 
                          <View>
                              <Text style={{ color: 'red',paddingLeft: Dimensions.get('window').width/14 }}>{nik_err_msg}</Text>
                          </View> }
                    </View>
                    ) }
                </Foect.Control>
                <Foect.Control name="name" minLength={2} maxLength={32}>
                    { /* you can use control for getting/setting it's value, checking/updating(control.isValid, control.markAsTouched(), ...) it's state, checking it's errors(control.errors.required) */ }
                    { control => (
                    <View style={styles.inputWrapperUserInput}>
                        <TextField
                          style={styles.inputUserInput}
                          name='name'
                          label='Nama Lengkap'
                          autoCorrect={false}
                          autoCapitalize="none"
                          returnKeyType='done'
                          baseColor={'#2b2b2b'}
                          tintColor={'#2ace87'}
                          value={control.value}
                          onChangeText={(text) => control.onChange(text)}
                        />
                        {
                          name_check==false && 
                          <View>
                              <Text style={{ color: 'red',paddingLeft: Dimensions.get('window').width/14 }}>{name_err_msg}</Text>
                          </View> }
                  </View>
                    ) }
                </Foect.Control>
                <Foect.Control name="email" minLength={2} maxLength={32}>
                    { /* you can use control for getting/setting it's value, checking/updating(control.isValid, control.markAsTouched(), ...) it's state, checking it's errors(control.errors.required) */ }
                    { control => (
                    <View style={styles.inputWrapperUserInput}>
                        <TextField
                          style={styles.inputUserInput}
                          name='email'
                          label='Email'
                          autoCorrect={false}
                          autoCapitalize="none"
                          returnKeyType='done'
                          baseColor={'#2b2b2b'}
                          tintColor={'#2ace87'}
                          value={control.value}
                          onChangeText={(text) => control.onChange(text)}
                        />
                        {
                          email_check==false && 
                          <View>
                              <Text style={{ color: 'red',paddingLeft: Dimensions.get('window').width/14 }}>{email_err_msg}</Text>
                          </View> }
                  </View>
                    ) }
                </Foect.Control>
                <Foect.Control name="phone" minLength={2} maxLength={32}>
                    { /* you can use control for getting/setting it's value, checking/updating(control.isValid, control.markAsTouched(), ...) it's state, checking it's errors(control.errors.required) */ }
                    { control => (
                    <View style={styles.inputWrapperUserInput}>
                        <TextField
                          style={styles.inputUserInput}
                          name='phone'
                          label='Nomor Telepon'
                          autoCorrect={false}
                          autoCapitalize="none"
                          returnKeyType='done'
                          baseColor={'#2b2b2b'}
                          tintColor={'#2ace87'}
                          value={control.value}
                          onChangeText={(text) => control.onChange(text)}
                        />
                        {
                          phone_check==false && 
                          <View>
                              <Text style={{ color: 'red',paddingLeft: Dimensions.get('window').width/14 }}>{phone_err_msg}</Text>
                          </View> }
                    </View>
                    ) }
                </Foect.Control>
                <Foect.Control name="address" minLength={2} maxLength={32}>
                    { /* you can use control for getting/setting it's value, checking/updating(control.isValid, control.markAsTouched(), ...) it's state, checking it's errors(control.errors.required) */ }
                    { control => (
                    <View style={styles.inputWrapperUserInput}>
                        <TextField
                          style={styles.inputUserInput}
                          name='address'
                          label='Alamat Lengkap'
                          autoCorrect={false}
                          autoCapitalize="none"
                          returnKeyType='done'
                          baseColor={'#2b2b2b'}
                          tintColor={'#2ace87'}
                          value={control.value}
                          onChangeText={(text) => control.onChange(text)}
                        />
                        {
                          address_check==false && 
                          <View>
                              <Text style={{ color: 'red',paddingLeft: Dimensions.get('window').width/14 }}>{address_err_msg}</Text>
                          </View> }
                    </View>
                    ) }
                </Foect.Control>
                <Foect.Control name="gender" minLength={2} maxLength={32}>
                    { /* you can use control for getting/setting it's value, checking/updating(control.isValid, control.markAsTouched(), ...) it's state, checking it's errors(control.errors.required) */ }
                    { control => (
                    <View style={styles.inputWrapperUserInputRB}>
                        <Text style={{color:'#2b2b2b', marginTop:10, marginBottom:10}}>
                            Jenis Kelamin
                        </Text>
                        <RadioForm
                            style={{marginLeft:10, marginTop: 5,}}
                            radio_props={radio_props}
                            initial={-1}
                            animation={true}
                            buttonColor={'#999999'}
                            selectedButtonColor={'rgba(0, 230, 150, 1)'}
                            selectedLabelColor={'#2b2b2b'}
                            labelColor={'#2b2b2b'}
                            buttonSize={10}
                            labelStyle={{ marginRight:Dimensions.get('window').width/11, marginBottom: 10, }}
                            formHorizontal={false}
                            onPress={(value) => control.onChange(value)}
                            value={control.value}
                        />
                        {
                          gender_check==false && 
                          <View>
                              <Text style={{ color: 'red',paddingLeft: Dimensions.get('window').width/14 }}>{gender_err_msg}</Text>
                          </View> }
                    </View>
                    ) }
                </Foect.Control>
                <Foect.Control name="birth_year">
                    { /* you can use control for getting/setting it's value, checking/updating(control.isValid, control.markAsTouched(), ...) it's state, checking it's errors(control.errors.required) */ }
                    { control => (
                    <View style={styles.inputWrapperUserInputDate}>
                    <Text style={{color:'#000000', marginTop: 5,}}>
                        Tanggal Lahir
                    </Text>
                    <DatePicker
                        style={{ width: Dimensions.get('window').width - 80, marginTop:10, color:'#000000', }}
                        date={control.value}
                        mode="date"
                        placeholder="Tanggal Lahir"
                        format="DD-MM-YYYY"
                        androidMode="spinner"
                        minDate="01-01-1945"
                        maxDate="31-12-2016"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                          placeholderText: {
                            fontSize: 14,
                            color: '#2b2b2b'
                          },
                          dateInput: {
                            borderColor: '#2b2b2b',
                            borderRadius: 5,
                            borderWidth: 0.5,
                          },
                        // dateIcon: {
                        //     position: 'absolute',
                        //     left: 0,
                        //     top: 4,
                        //     marginLeft: 0
                        // },
                        }}   
                        onDateChange={(date) => control.onChange(date) }
                        value={control.value}
                    />
                    {
                          birth_year_check==false && 
                          <View>
                              <Text style={{ color: 'red',paddingLeft: Dimensions.get('window').width/14 }}>{birth_year_err_msg}</Text>
                          </View> }
                    </View>
                    ) }
                </Foect.Control>
                <Foect.Control name="province" minLength={2} maxLength={32}>
                    { /* you can use control for getting/setting it's value, checking/updating(control.isValid, control.markAsTouched(), ...) it's state, checking it's errors(control.errors.required) */ }
                    { control => (
                    <View style={styles.inputWrapperUserInputCbox}>
                        <Dropdown
                            // style={{borderBottomWidth:0,borderBottomColor: '#090' }}
                            label='Province'
                            data={this.province_data}
                            itemCount={7}
                            // borderBottomColor="rgba(0, 255, 0, 0.35)"
                            textColor='#2b2b2b'
                            baseColor='#2b2b2b'
                            dropdownPosition={7}
                            // onChangeText={(text) => control.onChange(text)}
                            // onChange={console.log("asdas")}
                            onChangeText={(text) => {
                            // setTimeout(() => {
                                control.onChange(text)
                                this.renderCity(text);
                                // console.log(text);
                            // }, 2000);
                            }}
                            value={control.value}
                            // value={control.value}
                        />
                        {
                          province_check==false && 
                          <View>
                              <Text style={{ color: 'red',paddingLeft: Dimensions.get('window').width/14 }}>{province_err_msg}</Text>
                          </View> }
                    </View>
                    ) }
                </Foect.Control>
                <Foect.Control name="district" >
                      { control => (
                      <View style={styles.inputWrapperUserInputCbox}>
                          <Dropdown
                              label='City'
                              data={this.city_data}
                              baseColor='#2b2b2b'
                              onChangeText={(text) => control.onChange(text)}
                              value={control.value}
                          />
                          {
                          district_check==false && 
                          <View>
                              <Text style={{ color: 'red',paddingLeft: Dimensions.get('window').width/14 }}>{district_err_msg}</Text>
                          </View> }
                      </View>
                      ) }
                  </Foect.Control>
                  <Foect.Control name="zipcode" >
                      { /* you can use control for getting/setting it's value, checking/updating(control.isValid, control.markAsTouched(), ...) it's state, checking it's errors(control.errors.required) */ }
                      { control => (
                      <View style={styles.inputWrapperUserInput}>
                          {/* <Text>Phone Number</Text> */}
                          <TextField
                          style={styles.inputUserInput}
                          name='zipcode'
                          label='Zip Code'
                          autoCorrect={false}
                          autoCapitalize="none"
                          returnKeyType='done'
                          keyboardType='numeric'
                          baseColor={'#2b2b2b'}
                          tintColor={'#2ace87'}
                          value={control.value}
                          onBlur={control.markAsTouched}
                          onChangeText={(text) => control.onChange(text)}
                        />
                          {
                          zipcode_check==false && 
                          <View>
                              <Text style={{ color: 'red',paddingLeft: Dimensions.get('window').width/14 }}>{zipcode_err_msg}</Text>
                          </View> }
                      </View>
                      ) }
                  </Foect.Control>
                  <Foect.Control name="agent_code">
                      { control => (
                      <View style={styles.inputWrapperUserInput}>
                        <TextField
                          style={styles.inputUserInput}
                          name='agent_code'
                          label='Agent Code'
                          autoCorrect={false}
                          autoCapitalize="none"
                          returnKeyType='done'
                          keyboardType='numeric'
                          baseColor={'#2b2b2b'}
                          tintColor={'#2ace87'}
                          value={control.value}
                          onBlur={control.markAsTouched}
                          onChangeText={(text) => {
                            control.onChange(text)
                            this.checkAgentCode(text);
                          }}
                        />
                          {
                          this.state.agentcode_valid==false && 
                          <View>
                              <Text style={{ color: 'red' }}>{control.value} is not a valid agent code.</Text>
                          </View> }
                      </View>
                      ) }
                  </Foect.Control>

                  <View style={styles.containerButtonSubmit}>
                    <Animated.View style={{width: changeWidth}}>
                      <TouchableOpacity
                        onPress={() => form.submit()} 
                      >
                        {this.state.isLoading ? (
                          <Image source={spinner} style={styles.imageButtonSubmit} />
                          ) : (
                              <LinearGradient
                                colors={['#7ac02f', '#2cce85']}
                                style={styles.buttonSubmit}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                              >
                              <Text style={styles.buttonText}>
                                DAFTAR
                              </Text>
                              </LinearGradient>
                          )}
                      </TouchableOpacity>
                    </Animated.View>
                  </View>

                  {/* <TouchableOpacity
                  onPress={() => form.submit()} 
                  >
                    <LinearGradient
                        colors={['#82bf26', '#048c4c']}
                        style={styles.buttonSubmit}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        
                    >
                    <Text style={styles.buttonText}>
                        D A F T A R
                    </Text>
                    </LinearGradient>
                </TouchableOpacity> */}
                </View>
            ) }
        </Foect.Form>
        </View>
        <View>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={styles.modal}>
              <Text style={styles.modalTextBigger}>Registrasi Berhasil.</Text>
              <Image source={correctImage} style={styles.modalImage} />
              <Text style={styles.modalText}>Kata Sandi / Password Anda telah dikirimkan melalui Email dan SMS</Text>
              <TouchableOpacity
                  onPress={() => {
                      this.props.navigation.navigate('Login');
                    }}
                  >
                    <LinearGradient
                        colors={['#82bf26', '#048c4c']}
                        style={styles.buttonSubmit}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        
                    >
                    <Text style={styles.buttonText}>
                        M A S U K
                    </Text>
                    </LinearGradient>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    modalImage: {
      width: Dimensions.get('window').width /1.5,
      height: Dimensions.get('window').height /3,
      // resizeMode: 'cover',
    },
    modalButton: {
      width:100,
    },
    modalTextBigger: {
      fontSize: Dimensions.get('window').width /12,
      fontWeight: "bold",
      textAlign: 'center',
      margin: 15,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
    modalText: {
      fontSize: Dimensions.get('window').width /20,
      fontWeight: "bold",
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
    modal: {
      alignItems: 'center',
      justifyContent: 'center', 
      flex: 1,
    },
    buttonSubmit:{
      height: 50,
      width: Dimensions.get('window').width - 120,
      borderRadius: 50,
      flex: 1,
      justifyContent: 'space-around',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        // fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 15,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    container: {
        // flex: 1,
        top: 65,
        // width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
    color: 'white',
    backgroundColor: 'transparent',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F035E0',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
    },
    circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
    },
    textButtonSubmit: {
    color: 'white',
    backgroundColor: 'transparent',
    },
    imageButtonSubmit: {
    // width: 24,
    // height: 24,
    },
    containerButtonSubmit: {
        flex: 1,
        // top: -75,
        alignItems: 'center',
      justifyContent: 'flex-start',
        // justifyContent: 'flex-start',
    },
    containerButtonCancel: {
    //   flex: 1,
    //   top: -75,
      left: 22,
    //   alignItems: 'center',
    //   justifyContent: 'flex-start',
  },
    containerLogo: {
        // backgroundColor:"#005e5e",
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        marginBottom:Dimensions.get('window').height/20,
    },
    containerSign: {
        backgroundColor: 'black',
    },
    imageLogo: {
    // width: 80,
    // height: 80,
    },
    textLogo: {
    // color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    // marginTop: 20,
    fontSize:Dimensions.get('window').width/11,
    textAlign:'center'
    },
    containerForm: {
        flex: 1,
        // backgroundColor:"#5e005e",
        alignItems: 'center',
    },
    btnEyeForm: {
    position: 'absolute',
    // top: 55,
    // right: 28,
    },
    iconEyeForm: {
    width: Dimensions.get('window').width/13,
    height: Dimensions.get('window').width/13,
    tintColor: 'rgba(0,255,0,0.2)',
    },
    containerSign: {
        // flex: 1,
        // top: 95,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textSign: {
        // color: 'white',
        // backgroundColor: 'transparent',
    },
      buttonButtonSubmit: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00ff00',
        height: Dimensions.get('window').width/9,
        borderRadius: 20,
        zIndex: 100,
      },
      buttonButtonCancel: {
        // top: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00ff00',
        height: Dimensions.get('window').width/9,
        borderRadius: 20,
        zIndex: 100,
        width: Dimensions.get('window').width - 40,
      },
      circleButtonSubmit: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        borderWidth: 1,
        borderColor: '#F035E0',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#00ff00',
      },
      inputUserInput: {
        width: Dimensions.get('window').width - 40,
      },
      inputWrapperUserInput: {
        flex: 1,
        marginTop: 0,
        // marginTop: Dimensions.get('window').height/35,
      },
      inputWrapperUserInputRB: {
        // flexGrow:1,
        // alignItems: 'center',
        // marginTop: Dimensions.get('window').height/30,
        // width: Dimensions.get('window').width - 40,
        // height: Dimensions.get('window').height/20,
        // fontSize:10,
      },
      inputWrapperUserInputDate: {
        // flex: 1,
        // flexDirection: 'row',
        // marginLeft: Dimensions.get('window').width/9,
        // marginTop: Dimensions.get('window').height/30,
        // width: Dimensions.get('window').width - 40,
        // height: Dimensions.get('window').height/9,
      },
      inputWrapperUserInputCbox: {
        // marginLeft: Dimensions.get('window').width/9,
        // marginTop: -Dimensions.get('window').height/45,
        // width: Dimensions.get('window').width-80,
        // height: Dimensions.get('window').height/10,
      },
      inlineImgUserInput: {
        backgroundColor:"#5eff5e"
        // position: 'absolute',
        // zIndex: 99,
        // width: 22,
        // height: 22,
        // left: 35,
        // top: 91,
      },
  });