
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentDto } from 'src/DTO/Payment/createPaymentDto.dto';
import { ResMessage } from 'src/DTO/resController/RespMessage.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthValidateService {
    constructor(private readonly mailerService: MailerService){
}

    async sendMailUser(request: CreatePaymentDto){
        var res = new ResMessage();

         await this.mailerService.sendMail(
            {
                to: request.Mail,
                from: 'edsghotsolutions@gmail.com',
                subject: `PAGO REALIZADO falta dar acceso`,
                text: 'welcome a edsghotSolutions',
                html: `<div
  style="
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;
    background-color: #ffffff;
    text-align: center;
    font-size: 16px;
    margin: 0;
    padding: 0;
  "
>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    "
  >
    <div style="display: block; align-items: center; margin-bottom: 20px">
      <img
        src="https://img.freepik.com/premium-vector/gradient-code-logo-tagline-here_23-2148808179.jpg"
        alt="Logo"
        style="width: 50px; height: auto; margin-right: 10px"
      />
      <p
        style="
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          color: #0f0f0f;
          font-size: 32px;
          font-weight: bold;
          margin: 10px 0;
        "
      >
        CONTROLZ
      </p>
    </div>
    <div style="display: block;">
        <div
        style="
        display: block;
          width: 80%;
          max-width: 600px;
          background-color: #0f0f0f;
          color: #ffffff;
          padding: 40px;
          margin: 20px auto;
          text-align: left;
          border-radius: 6px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        "
      >
        <div>
          <p
            style="
              font-family: Verdana, Geneva, Tahoma, sans-serif;
              color: #fff;
              font-size: 28px;
              font-weight: bold;
              margin: 10px 0;
            "
          >
            ¡Hola! ${request.Mail} 🚀
          </p>
          <p style="color: #fff">
            Has recibido una solicitud de compra para un curso. 📝 Te solicitamos
            revisar detalladamente el comprobante de pago adjunto para proceder
            con la confirmación de compra. Una vez verificado el voucher de pago,
            procederemos a completar la solicitud. ✅
          </p>
        </div>
        <hr />
        <div style="margin-top: 30px; font-size: 16px; color: #fff">
          <p>
            <span style="font-weight: bold; color: #f92f60; margin-bottom: 13px"
              >Nombres:</span
            >${request.FirstName} <br />
            <span style="font-weight: bold; color: #f92f60; margin-bottom: 13px"
              >Apellidos:</span
            >
            ${request.LastName} <br />
            <span style="font-weight: bold; color: #f92f60; margin-bottom: 13px"
              >Dni:</span
            >
            ${request.Dni} <br />
            <span style="font-weight: bold; color: #f92f60; margin-bottom: 13px"
              >Teléfono:</span
            >
            ${request.PhoneNumber} <br />
            <span style="font-weight: bold; color: #f92f60; margin-bottom: 13px"
              >Gmail:</span
            >
            ${request.Mail} <br />
  
            <span style="font-weight: bold; color: #f92f60; margin-bottom: 13px"
              >Voucher:</span
            >
            <img
              src="https://imgv2-2-f.scribdassets.com/img/document/358541868/original/f077a82030/1714432479?v=1"
              alt="User Image"
              style="width: 300px; height: auto; margin-left: 10px"
            />
          </p>
          <div style="display: flex; justify-content: flex-end; margin-top: 20px">
            <a
              href="https://aped-cousearchitecture-production.up.railway.app/api/payment/acceptPayment/${request.IdCourse}/${request.Dni}"
              style="
                background-color: #f92f60;
                color: #ffffff;
                margin-right: 10px;
                border: none;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                border-radius: 4px;
              "
            >
              Confirmar Compra
          </a>
            <a
            href="https://aped-cousearchitecture-production.up.railway.app/api/payment/failPayment/${request.IdCourse}/${request.Dni}"
              style="
                background-color: #333;
                color: #ffffff;
                border: none;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                border-radius: 4px;
              "
            >
              Rechazar Compra
          </a>
          </div>
  
          <p style="margin-top: 20px; color: #fff">
            ¿Necesitas ayuda? Contacta con nuestro equipo de soporte técnico
            <a
              href="https://jheysonjhairpro.ccontrolz.com/"
              target="_blank"
              style="
                color: #f92f60;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
              "
              >aquí</a
            >. ¿Quieres darnos tu opinión? ¡Dinos lo que piensas en nuestra
            <a
              href="https://jheysonjhairpro.ccontrolz.com/"
              target="_blank"
              style="
                color: #f92f60;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
              "
              >página de opiniones</a
            >.
          </p>
        </div>
      </div>
      <div style="display:block, 30px; font-size: 13px; color: #000">
        <p>
          Enviado por Developers,
          <a
            href="https://jheysonjhairpro.ccontrolz.com/"
            target="_blank"
            style="
              color: #f92f60;
              text-decoration: none;
              font-weight: bold;
              font-size: 14px;
            "
            >consulta nuestro blog</a
          >
          De CONTROLZ, Perú 2024
        </p>
      </div>
    </div>
  </div>
</div>`,
            }
        )
        return res.resultOK("Se envio correctamente");
    }
    
    

    async sendPaymentSuccess(request: CreatePaymentDto){
        var res = new ResMessage();

         await this.mailerService.sendMail(
            {
                to: request.Mail,
                from: 'edsghotsolutions@gmail.com',
                subject: `PAGO REALIZADO falta dar acceso`,
                text: 'welcome a edsghotSolutions',
                html: `<div
  style="
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;
    background-color: #ffffff;
    text-align: center;
    font-size: 16px;
    margin: 0;
    padding: 0;
  "
>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    "
  >
    <div style="display: block; align-items: center; margin-bottom: 20px">
      <img
        src="https://img.freepik.com/premium-vector/gradient-code-logo-tagline-here_23-2148808179.jpg"
        alt="Logo"
        style="width: 50px; height: auto; margin-right: 10px"
      />
      <p
        style="
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          color: #0f0f0f;
          font-size: 32px;
          font-weight: bold;
          margin: 10px 0;
        "
      >
        CONTROLZ
      </p>
    </div>
    <div style="display: block">
      <div
        style="
          width: 80%;
          max-width: 600px;
          background-color: #0f0f0f;
          color: #ffffff;
          padding: 40px;
          margin: 20px auto;
          text-align: left;
          border-radius: 6px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        "
      >
        <div>
          <p
            style="
              font-family: Verdana, Geneva, Tahoma, sans-serif;
              color: #fff;
              font-size: 28px;
              font-weight: bold;
              margin: 10px 0;
            "
          >
            ¡Hola! 🚀
          </p>
          <p style="color: #fff">
            Hemos revisado el comprobante de pago adjunto y nos complace
            informarte que tu compra ha sido aceptada. 🎉
          </p>
        </div>
        <hr />
        <div style="margin-top: 30px; font-size: 16px; color: #fff">
          <p>
            ¿Necesitas ayuda? Contacta con nuestro equipo de soporte técnico
            <a
              href="https://jheysonjhairpro.ccontrolz.com/"
              target="_blank"
              style="
                color: #f92f60;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
              "
              >aquí</a
            >. ¿Quieres darnos tu opinión? ¡Dinos lo que piensas en nuestra
            <a
              href="https://jheysonjhairpro.ccontrolz.com/"
              target="_blank"
              style="
                color: #f92f60;
                text-decoration: none;
                font-weight: bold;
                font-size: 14px;
              "
              >página de opiniones</a
            >.
          </p>
        </div>
      </div>
      <div style="margin-top: 30px; font-size: 13px; color: #000">
        <p>
          Enviado por Developers,
          <a
            href="https://jheysonjhairpro.ccontrolz.com/"
            target="_blank"
            style="
              color: #f92f60;
              text-decoration: none;
              font-weight: bold;
              font-size: 14px;
            "
            >consulta nuestro blog</a
          >
          De CONTROLZ, Perú 2024
        </p>
      </div>
    </div>
  </div>
</div>`,
            }
        )
        return res.resultOK("Se envio correctamente");
    }

    async sendPaymentError(request: CreatePaymentDto){
        var res = new ResMessage();

         await this.mailerService.sendMail(
            {
                to: request.Mail,
                from: 'edsghotsolutions@gmail.com',
                subject: `PAGO REALIZADO falta dar acceso`,
                text: 'welcome a edsghotSolutions',
                html: `<div
  style="
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;
    background-color: #ffffff;
    text-align: center;
    font-size: 16px;
    margin: 0;
    padding: 0;
  "
>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    "
  >
    <div style="display: block; align-items: center; margin-bottom: 20px">
      <img
        src="https://img.freepik.com/premium-vector/gradient-code-logo-tagline-here_23-2148808179.jpg"
        alt="Logo"
        style="width: 50px; height: auto; margin-right: 10px"
      />
      <p
        style="
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          color: #0f0f0f;
          font-size: 32px;
          font-weight: bold;
          margin: 10px 0;
        "
      >
        CONTROLZ
      </p>
    </div>
    <div style="display: block">
      <div
        style="
          width: 80%;
          max-width: 600px;
          background-color: #0f0f0f;
          color: #ffffff;
          padding: 40px;
          margin: 20px auto;
          text-align: left;
          border-radius: 6px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        "
      >
        <div>
          <p
            style="
              font-family: Verdana, Geneva, Tahoma, sans-serif;
              color: #fff;
              font-size: 28px;
              font-weight: bold;
              margin: 10px 0;
            "
          >
            ¡Hola! 🚀
          </p>
          <p style="color: #fff">
            Hemos revisado el comprobante de pago adjunto y lamentablemente no
            podemos proceder con la confirmación de tu compra en este momento.
            Por favor, verifica nuevamente el voucher de pago adjunto y
            asegúrate de que todos los detalles sean correctos.
          </p>
        </div>
        <hr />
        <div style="margin-top: 30px; font-size: 16px; color: #fff">
          <p>
            <span style="font-weight: bold; color: #f92f60; margin-bottom: 13px"
              >Voucher:</span
            >
            <img
              src="https://imgv2-2-f.scribdassets.com/img/document/358541868/original/f077a82030/1714432479?v=1"
              alt="User Image"
              style="width: 300px; height: auto; margin-left: 10px"
            />
          </p>
        </div>
      </div>
      <div style="margin-top: 30px; font-size: 13px; color: #000">
        <p>
          Enviado por Developers,
          <a
            href="https://jheysonjhairpro.ccontrolz.com/"
            target="_blank"
            style="
              color: #f92f60;
              text-decoration: none;
              font-weight: bold;
              font-size: 14px;
            "
            >consulta nuestro blog</a
          >
          De CONTROLZ, Perú 2024
        </p>
      </div>
    </div>
  </div>
</div>`,
            }
        )
        return res.resultOK("Se envio correctamente");
    }
    obtenerNombreEmail(email: string){
        var name = '';
        for(var i= 0;i< email.length;i++){
            if(email[i] === '@'){
                break;
            }
            name += email[i];
        }

        return name;
    }
}
