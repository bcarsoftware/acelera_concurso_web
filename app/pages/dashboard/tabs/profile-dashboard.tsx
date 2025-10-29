import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputText} from "~/pages/dashboard/components/input-text";
import {InputDate} from "~/pages/dashboard/components/input-date";
import {Button} from "~/pages/dashboard/components/button";
import {HtmlType} from "../../../../enums/html-type";
import {Colors} from "../../../../enums/colors";
import {Select} from "~/pages/dashboard/components/select";

export const ProfileDashboardPage = () => {
    return (
        <form>
            <ProfileStyle />
            <h1>Perfil de Usuário: {"Nome"}</h1>
            <ContentWide>
                <ContentCard>
                    <InputText
                        labelContent={"Nome*"}
                        name={"first-name"}
                        placeholder={"Fulano"}
                        required={true}
                        disabled={false}
                    />
                    <InputText
                        labelContent={"Sobrenmoe*"}
                        name={"last-name"}
                        placeholder={"Sicrano"}
                        required={true}
                        disabled={false}
                    />
                    <InputDate
                        labelContent={"Data de Nascimento*"}
                        name={"date-born"}
                        placeholder={""}
                        required={true}
                        disabled={true}
                    />
                    <Select
                        name={"gender"}
                        required={true}
                        disabled={false}
                        label={"Genêro*"}
                    >
                        <option value={"FEMALE"}>Mulher</option>
                        <option value={"MALE"}>Homem</option>
                        <option value={"NOT_BINARY"}>Não Binário</option>
                        <option value={"NOT_SAY"}>Não Dizer</option>
                    </Select>
                    <InputText
                        labelContent={"Nome de Usuárip*"}
                        name={"username"}
                        placeholder={"@username"}
                        required={true}
                        disabled={false}
                    />
                    <InputText
                        labelContent={"Endereço de E-Mail*"}
                        name={"email"}
                        placeholder={"username@service.com"}
                        required={true}
                        disabled={false}
                    />
                    <InputText
                        value={"0"}
                        labelContent={"Pontos"}
                        name={"points"}
                        placeholder={"1,2,3"}
                        required={false}
                        disabled={true}
                    />

                    <div className={"info-container"}>
                        <p>
                            Apenas nas Configurações:
                        </p>
                        <p>
                            <ul>
                                <li>Alterações de Senha;</li>
                                <li>Desativação de Conta;</li>
                            </ul>
                        </p>
                    </div>

                    <Button
                        buttonContent={"Atualizar Perfil"}
                        buttonType={HtmlType.SUBMIT}
                        name={"update-profile-button"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE
                        }}
                    />
                </ContentCard>
            </ContentWide>
        </form>
    );
};

const ProfileStyle = () => {
    const styles = `
        .info-container {
            margin-bottom: 15px;
        }
        
        .info-container ul {
            margin-left: 15px;
        }
        
        .info-container li {
            list-style-type: disc;
            margin-left: 15px;
        }
    `;

    return (<style>{styles}</style>)
};
