<template>
  <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-btn block x-large color="primary" @click="generate_2fa">Generate 2FA</v-btn>
          <div v-if="secretCode">
            <img v-if="true" :src="qrCode" class="img-fluid" alt="">
            <v-card class="justify-center d-flex mx-auto mt-5">
              <v-card-text>
                <div class="font-weight-bold ml-8 h3 mb-2 text-dark">
                  Secret Code
                </div>

                <v-timeline align-top dense>
                  <v-timeline-item color="red" small>
                    <div class="text-justify text-dark">
                      <div class="font-weight-normal">
                        <strong>ASCII</strong>
                      </div>
                      <div>{{secretCode.ascii}}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
                <v-timeline align-top dense>
                  <v-timeline-item color="red" small>
                    <div class="text-justify text-dark">
                      <div class="font-weight-normal">
                        <strong>HEX</strong>
                      </div>
                      <div>{{secretCode.hex}}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
                <v-timeline align-top dense>
                  <v-timeline-item color="red" small>
                    <div class="text-justify text-dark">
                      <div class="font-weight-normal">
                        <strong>Base 32</strong>
                      </div>
                      <div>{{secretCode.base32}}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
                <v-timeline align-top dense>
                  <v-timeline-item color="red" small>
                    <div class="text-justify text-dark">
                      <div class="font-weight-normal">
                        <strong>OTP Auth URL</strong>
                      </div>
                      <div>{{secretCode.otpauth_url}}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>

              </v-card-text>
            </v-card>
            
          </div>
          <v-text-field label="Verify OTP" :rules="rules" hide-details="auto" class="my-3" v-model="otp"></v-text-field>
          <v-btn class="w-50" x-large color="primary" @click="verify">Verify</v-btn>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
export default {
  name: 'home',
  components: {
    
  },
  data() {
    return {
      is2fa: false,
      secretCode: '',
      qrCode: '',
      rules: [
        value => !!value || 'Required.',        
        value => {
          const pattern = /^\d+$/
          return pattern.test(value) || 'Invalid OTP.'
        },
        value => (value || '').length === 6 || 'Must 6 digits',
      ],
      otp: ''
    }
  },
  methods: {
    generate_2fa() {
      this.secretCode = speakeasy.generateSecret({
        length: 512,
        name: 'Test Google Authenticator (test@email.com)'
      });

      let otpauth_url = speakeasy.otpauthURL({
        secret: this.secretCode.otpauth_url,
        label: 'test@email.com',
        type: 'totp',
        issuer: 'Test Google Authenticator',
        algorithm: 'sha512',
        encoding: 'base64'
      })

      // Get the data URL of the authenticator URL
      QRCode.toDataURL(otpauth_url, (err, data_url) => {
        this.qrCode = data_url
      });
    },
    verify(){
      let result = speakeasy.totp.verify({
        secret: this.secretCode.otpauth_url,
        token: this.otp,
        algorithm: 'sha512',
        encoding: 'base64'
      })
      alert(result)
    }
  },
}
</script>
<style scoped>

</style>