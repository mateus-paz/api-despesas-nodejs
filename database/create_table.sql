--Create tables

CREATE TABLE tipos_pagamento(
	id serial not null,
	tipo character varying(50) not null
);

alter table tipos_pagamento add constraint pk_tpg primary key (id);

create table categorias(
	id serial not null,
	nome character varying (50) not null,
	descricao character varying (100) not null
);

alter table categorias add constraint pg_cat primary key (id);

create table despesas(
	id serial not null,
	valor DECIMAL not null,
	data_compra timestamp not null,
	descricao character varying (50),
	tipo_pagamento_id integer not null,
	categoria_id integer not null
);

alter table despesas add constraint pk_dps primary key (id);
alter table despesas add constraint fk_dps_tpg foreign key (tipo_pagamento_id) references tipos_pagamento(id);
alter table despesas add constraint fk_dps_cat foreign key (categoria_id) references categorias (id);

--Insert de dados iniciais

insert into tipos_pagamento(tipo) values ('Dinheiro');
insert into tipos_pagamento(tipo) values ('Débito');
insert into tipos_pagamento(tipo) values ('Crédito');
insert into tipos_pagamento(tipo) values ('Pix');

insert into categorias(nome, descricao) values ('Básica','Despesas básicas do dia a dias. ex: compra do mês, aluguel, agua, luz, internet.');
insert into categorias(nome, descricao) values ('Lazer','Despesas para satisfação pessoal. ex: livros, cinema, lanches.');
insert into categorias(nome, descricao) values ('Emergencia','Despesas não esperadas. ex: médico, remedio, compromisso de ultima hora.');


