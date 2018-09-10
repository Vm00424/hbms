@SuppressWarnings("finally")
	@Override
	public List<RoomDetail> getRoomList() throws HbmsException {
		Connection conn=DBConnection.getConnection();
		List<RoomDetail> roomList=new ArrayList<RoomDetail>();
		int roomCount=0;
		PreparedStatement preparedStatement=null;
		ResultSet resultset=null;
		try{
		preparedStatement=conn.prepareStatement(QueryMapper.GET_ROOM_LIST);
		resultset=preparedStatement.executeQuery();
		while(resultset.next()){
			RoomDetail roomdetail=new RoomDetail();
			roomdetail.setHotelId(resultset.getString(1));
			roomdetail.setRoomId(resultset.getString(2));
			roomdetail.setRoomNo(resultset.getString(3));
			roomdetail.setRoomType(resultset.getString(4));
			roomdetail.setPerNightRate(resultset.getDouble(5));
			roomdetail.setAvailability(resultset.getString(6));
			roomCount++;
			
			
		}
		}catch(SQLException sqlException){
			logger.error(sqlException.getMessage());
			throw new HbmsException("Technical problem occured.refer Log");
		}finally{
			try {
				if(resultset !=null){
				resultset.close();
				}
				if(preparedStatement !=null){
					preparedStatement.close();
					}
				if(conn !=null){
					conn.close();
					}
				
				
			} catch (SQLException e) {
				logger.error(e.getMessage());
			}
			if(roomCount==0){
				return null;
			}else{
				return roomList;
			}
			
			
	}
	}