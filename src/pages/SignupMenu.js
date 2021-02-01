import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    container: {
        margin: theme.spacing(0, 20),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
}));

const items = [
    {
        title: 'Client',
        price: '0',
        description: ['U kunt onder de verzekering van onze stichting terecht voor een goede service.'],
        buttonText: 'Contact Us',
        buttonVariant: 'contained',
        imageURL: '../images/client.jpg',
    },
    {
        title: 'Professional',
        subheader: 'Most Popular',
        price: '15',
        description: [
            'Wil je je klanten niet imponeren met je talenten en ze een goede service bieden?',
        ],
        buttonText: 'Contact Us',
        buttonVariant: 'contained',
        imageURL: 'images/professional.jpg',
    },
    {
        title: 'Connector',
        subheader: '',
        price: '30',
        description: [
            'Als vrijwillig medewerker van onze stichting bouw je een brug tussen professionals en klanten.',
        ],
        buttonText: 'Contact us',
        buttonVariant: 'contained',
        imageURL: '../images/connector.jpg',
    },
    {
        title: 'Sponsor',
        subheader: '',
        price: '30',
        description: [
            'Wilt u als sponsor deelnemen om onze stichting te helpen een breder publiek te bereiken?',
        ],
        buttonText: 'Contact us',
        buttonVariant: 'contained',
        imageURL: 'images/sponsor.jpg',
    },

];

const SignupMenu = () => {
    const classes = useStyles();
    const history = useHistory();

    const handleClick = (event) => {

        history.push(`/register/${event.currentTarget.value.toLowerCase()}`)
        // switch (event.currentTarget.value) {
        //     case 'Volunteer':
        //         history.push('/signup-volunteer');
        //         break;
        //     case 'Professional':
        //         history.push('/signup-professional');
        //         break;
        //     case 'Sponsor':
        //         history.push('/signup-sponsor');
        //         break;
        //     case 'Client':
        //         history.push('/signup-client');
        //         break;
        //     default:
        //         break;
        // }
    }

    return (
        <>
            <Container maxWidth="lg" component="main">
                <Grid container spacing={5} alignItems="flex-end" pt={3}>
                    {items.map((item) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={item.title} xs={12} sm={6} md={3}>
                            <Card>
                                <CardHeader
                                    title={item.title}
                                    subheader={item.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{ align: 'center' }}
                                    action={item.title === 'Professional' ? <StarIcon /> : null}
                                    className={classes.cardHeader}
                                />
                                <CardMedia

                                    className={classes.cardMedia}
                                    image="https://source.unsplash.com/random"
                                    title={JSON.stringify(item.imageURL)}
                                />
                                <CardContent>
                                    <ul>
                                        {item.description.map((line) => (
                                            <Typography component="li" variant="subtitle1" align="center" key={line}>
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        onClick={handleClick}
                                        fullWidth
                                        variant={item.buttonVariant}
                                        color="secondary"
                                        value={item.title}
                                    >
                                        {item.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export { SignupMenu };

// TODO: yazi alanina sabit bir uzunluk vermek gerekiyor ki yaziya gore yukariya dogru uzamanasin.
// TODO: Button renkleri ve yazilari ayarlanacak.
// TODO: Ekran kuculdugunde alttaki kartlarin butonlari footer altinda kaliyor duzeltilecek.
// TODO: Cart'larin header kismina farkli bir renk verilebilir.
// TODO: 